import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import {
	getStorage,
	ref,
	uploadBytesResumable,
	getDownloadURL,
	deleteObject,
} from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import {
	collection,
	query,
	where,
	onSnapshot,
	getFirestore,
	doc,
	setDoc,
	getDoc,
	deleteDoc,
} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	//hidden
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);
const storage = getStorage(app);

export const auth = getAuth(app);
export default app;

export async function createNewUserDocument(uid, firstName, lastName, email) {
	console.log("created new user doc ", uid, firstName, lastName, email);
	await setDoc(doc(db, "users", uid), {
		firstName: firstName,
		lastName: lastName,
		email: email,
		PDFs: [],
	});
}

export function PDFUploadByUser(filepath, uid, fileName, dateUploaded) {
	return new Promise(async (resolve, reject) => {
		const response = await fetch(filepath);
		const file = await response.blob();
		const metadata = {
			contentType: "application/pdf",
		};

		const pdfid = uuidv4();
		const storageRef = ref(storage, `pdfs/${pdfid}.pdf`);
		const uploadTask = uploadBytesResumable(storageRef, file, metadata);

		uploadTask.on(
			"state_changed",
			(snapshot) => {
				const progress =
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				console.log("Upload is " + progress + "% done");
				switch (snapshot.state) {
					case "paused":
						console.log("Upload is paused");
						break;
					case "running":
						console.log("Upload is running");
						break;
				}
			},
			(error) => {
				reject(error); // Reject the promise on upload error
			},
			async () => {
				try {
					const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
					// console.log("File available at", downloadURL);

					await setDoc(doc(db, "pdfs", pdfid), {
						downloadURL: downloadURL,
						fileName: fileName,
						uid: uid,
						dateUploaded: dateUploaded,
					});

					resolve(true); // Resolve the promise when upload and database update are complete
				} catch (error) {
					reject(error); // Reject the promise on any error during database update
				}
			}
		);
	});
}

export function subscribeToPDFCollection(uid, setPDFFiles, PDFFiles) {
	const q = query(collection(db, "pdfs"), where("uid", "==", uid));

	return onSnapshot(q, (snapshot) => {
		snapshot.docChanges().forEach((change) => {
			if (change.type === "added") {
				console.log("New pdf: ", change.doc.data());
			}
			if (change.type === "modified") {
				console.log("Modified pdf: ", change.doc.data());
			}
			if (change.type === "removed") {
				console.log("Removed pdf: ", change.doc.data());
			}
		});

		const newPDFFiles = snapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data(),
		}));

		// console.log(q, auth.currentUser.uid, newPDFFiles);
		setPDFFiles(newPDFFiles);
	});
}

export async function deletePDF(pdfid) {
	const storageRef = ref(storage, `pdfs/${pdfid}.pdf`);
	deleteObject(storageRef)
		.then(() => {
			// File deleted successfully
		})
		.catch((error) => {
			// Uh-oh, an error occurred!
		});

	await deleteDoc(doc(db, "pdfs", pdfid));
}

export async function retrievePdf(uid, documentId) {
	try {
		const docRef = doc(db, "pdfs", documentId);
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) {
			const pdfData = docSnap.data();
			// console.log(pdfData);
			// Check if the uid of the requesting user is associated with the PDF
			if (pdfData.uid === uid) {
				return pdfData["downloadURL"]; // User is authorized to access the PDF
			} else {
				console.log("User is not authorized to access this document");
				return null; // User is not authorized
			}
		} else {
			console.log("No such document!");
			return null;
		}
	} catch (error) {
		console.error("Error fetching document: ", error);
		return null;
	}
}
