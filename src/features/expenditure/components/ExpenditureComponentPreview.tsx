import { Component, useState } from "react";
import { ExpenditureAddForm } from "./ExpenditureComponents/ExpenditureAddForm";
import { ExpenditureList } from "./ExpenditureComponents/ExpenditureList";

export const ExpenditureComponentPreview = () =>{
    const [props, setProps] = useState()

    return( 
    <div>
        <p>支出入力フォーム</p>
        <ExpenditureAddForm/>
        <p>支出一覧</p>
        <ExpenditureList/>
    </div>
    );
}