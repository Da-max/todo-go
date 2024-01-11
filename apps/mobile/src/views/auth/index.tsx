import { Tab, TabView } from "@rneui/themed";
import { useState } from "react";
import { Login } from "../../components/Auth/Login/Login";
import { SignUp } from "../../components/Auth/SignUp/SignUp";

export const Index = () => {
    const items = [
        { title: "Se connecter", content: <Login /> },
        { title: "Créer un compte", content: <SignUp /> },
    ];
    const [value, setValue] = useState(0);
    return (
        <>
            <Tab value={value} onChange={(e) => setValue(e)}>
                {items.map((item) => (
                    <Tab.Item key={item.title} title={item.title} />
                ))}
            </Tab>
            <TabView
                containerStyle={{ width: "100%" }}
                value={value}
                onChange={setValue}
            >
                {items.map((i) => (
                    <TabView.Item
                        style={{ width: "100%", justifyContent: "center" }}
                    >
                        {i.content}
                    </TabView.Item>
                ))}
            </TabView>
        </>
    );
};
