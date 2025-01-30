import Header from "@/layout/Header";
import Footer from "@/layout/Footer";
import { memo } from "react";
import Main from "../layout/Main";
import { AuthProvider } from "@/context/AuthContext";

export default memo(function Home() {
    return (
        <>
            <Header/>
            <Main />
            <Footer/>
        </>
    );
});
