import Footer from "@/layout/Footer";
import Header from '@/layout/Header';
import { memo } from "react";
import Main from "../layout/Main";

export default memo(function Home() {
    return (
        <>
            <Header/>
            <Main />
            <Footer/>
        </>
    );
});
