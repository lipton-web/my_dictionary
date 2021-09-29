import './App.css';
import React from 'react';

import {Route, Switch} from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";

import {db} from './firebase';
import { collection, getDoc, getDocs, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';

import Dictionary from './Dictionary';
import Addword from './Addword';
import Detail from './Detail';
import NotFound from './NotFound';
import {loadDictionaryFB, addDictionaryFB} from "./redux/modules/dictionary"

import useInfiniteScroll from './useInfiniteScroll';
import { useCallback } from "react";


function App() {
  const dispatch = useDispatch(); 

  //async await 안하면 Promise {<pending>} 나온다.
  // React.useEffect(async() => {
    // console.log(db);
  
    //  데이터 가져오기
    //  const query = await getDocs(collection(db, 'myDictionary')); //myDictionary에 있는 모든 docs 가져오기
    //  console.log(query); //읽기 좋은 형식이 아니다.
    //  query.forEach((doc) => { //doc은 doc하나하나 의미
    //    console.log(doc.id, doc.data()) //읽기 좋은 형식
    //    });

    //데이터 추가하기
    // addDoc(collection(db, 'myDictionary'), {word:"", explain:"", ex:""})

    // 데이터 수정하기
    // const docRef = doc(db, 'myDictionary', 'BMJKmZdGH7iVy8feop03'); //수정할 doc 잡아오기
    // updateDoc(docRef, {word:"흠터레스팅"})

    // 데이터 삭제하기
    // const docRef = doc(db, 'myDictionary', 'BMJKmZdGH7iVy8feop03'); //수정할 doc 잡아오기
    // deleteDoc(docRef);
  // }, []); 

  React.useEffect(() => {
    dispatch(loadDictionaryFB());
  }, []);



  return (
    <div style={{padding: '12px'}} className="App">
      <Switch>

        <Route path='/' exact>
          <Dictionary />
        </ Route>

        <Route path='/addword' exact>
          <Addword />
        </Route>

        <Route path='/detail/:index' exact>
          <Detail />
        </Route>

        <Route>
          <NotFound/>
        </Route>

      </Switch>

    </div>
  );
}

export default App;
