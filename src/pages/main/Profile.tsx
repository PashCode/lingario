import LogoutButton from "@/features/auth/components/LogoutButton";
import DeleteAccount from "@/features/auth/components/DeleteAccount";
// import { useAppSelector } from "@/app/store";
// import { selectOxford3000 } from "@/components/dictionary/slice";
// import {
//   collection,
//   addDoc,
//   getDocs,
//   deleteDoc,
//   updateDoc,
//   doc,
// } from "firebase/firestore";
// import { db } from "@/config/firebase";
// import Button from "@/shared/components/ui/Button";
// import { useEffect, useState } from "react";

function Profile() {
  // const oxfordD3000 = useAppSelector(selectOxford3000);
  // const [data, setData] = useState({});
  //
  // useEffect(() => {
  //   async function readData() {
  //     const querySnapshot = await getDocs(collection(db, "users"));
  //     querySnapshot.forEach((doc) => {
  //       setData(doc.data());
  //       console.log(doc.data());
  //     });
  //   }
  //   void readData();
  // }, []);
  //
  // async function loadData() {
  //   try {
  //     const docRef = await addDoc(collection(db, "users"), {
  //       first: "Ada",
  //       last: "Lovelace",
  //       born: 1815,
  //       test: "test",
  //     });
  //     console.log("Document written with ID: ", docRef.id);
  //   } catch (e) {
  //     console.error("Error adding document: ", e);
  //   }
  // }
  //
  // async function deleteData() {
  //   const data = await getDocs(collection(db, "users"));
  //   const id = data.docs[0].id;
  //   await deleteDoc(doc(db, "users", id));
  //   console.log("success");
  // }
  //
  // async function updateData() {
  //   const data = await getDocs(collection(db, "users"));
  //   const id = data.docs[0].id;
  //   const reference = doc(db, "users", id);
  //   await updateDoc(reference, { capital: true });
  // }

  return (
    <>
      <div>PROFILE</div>
      <LogoutButton />
      <DeleteAccount />

      {/*{oxfordD3000.length ? (*/}
      {/*    <div className="border-4 border-amber-600">*/}
      {/*      <h1>*/}
      {/*        Слово: {oxfordD3000[10].e} <br />*/}
      {/*        Переклад: {oxfordD3000[10].u} <br />*/}
      {/*        Рівень: {oxfordD3000[10].l}*/}
      {/*      </h1>*/}

      {/*      <div className="flex gap-2">*/}
      {/*        <button className="cursor-pointer bg-green-500">Додати</button>*/}
      {/*        <button className="cursor-pointer bg-red-500">Видалити</button>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*) : (*/}
      {/*  "undefined"*/}
      {/*)}*/}
      {/*<hr />*/}
      {/*<Button onClick={loadData} text="Завантажити дані у DB" />*/}
      {/*<hr />*/}
      {/*<Button onClick={deleteData} text="Видалити дані з DB" />*/}
      {/*<hr />*/}
      {/*<Button onClick={updateData} text="Оновити дані в DB" />*/}

      {/*<h1>{data ? data?.last : "поки тут нічого"}</h1>*/}
    </>
  );
}

export default Profile;
