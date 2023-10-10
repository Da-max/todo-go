import { Tab, TabView } from "@rneui/themed";
import { useState } from "react";
import { Login } from "./Login/Login";
import { SignUp } from "./SignUp/SignUp";

export const Auth = () => {
    const items = [{ title: "Login" }, { title: "SignUp" }];
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
                <TabView.Item
                    style={{ width: "100%", justifyContent: "center" }}
                >
                    <Login />
                </TabView.Item>
                <TabView.Item
                    style={{ width: "100%", justifyContent: "center" }}
                >
                    <SignUp />
                </TabView.Item>
            </TabView>
        </>
    );
};
