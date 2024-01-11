import { Todo } from "../components/Todo/Todo";
import { Link } from "@react-navigation/native";

export const Home = () => {
    return (
        <>
            <Link to={"/Auth"}>Auh</Link>
            <Todo />
        </>
    );
};
