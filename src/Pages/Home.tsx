import { Button } from "@chakra-ui/button";
import { Flex } from "@chakra-ui/layout";
import { useDisclosure } from "@chakra-ui/react";
import React from "react";
import { useHistory} from "react-router";
import AddPost from "../Components/AddPost";
import Posts from "../Components/Posts";

export default function Home() {

    const [refresh, setRefresh] = React.useState(true)

    const history = useHistory()

    const go = async(path: string) => {
        history.replace(path)
    }
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <Flex direction="column">
            <Flex>
                <Button onClick={onOpen}>Add Post</Button>
                <Button onClick={() => go("/")}>Log Out</Button>
            </Flex>
            <AddPost isOpen={isOpen} onClose={onClose} refresh={refresh} setRefresh={setRefresh}/>
            <Posts refresh={refresh}/>
        </Flex>
    );
}