import React from "react";
import { Flex } from "@chakra-ui/react";
import ViewPost from "./ViewPost";

export default function Posts() {
    let list = ["1","2","3","4","5","6","7","8"]
    return (
      <Flex flexWrap="wrap" bg="red" justify="space-evenly">
        {list.map(_list => <ViewPost post={_list}/>)}
      </Flex>
    );
}