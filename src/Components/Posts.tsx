import React from "react";
import { Flex } from "@chakra-ui/react";
import ViewPost from "./ViewPost";
import { useGetPostsQuery } from "../generated/graphql";
import { useHistory } from "react-router";

export default function Posts(refresh: any) {

    const [reFresh, setReFresh ] = React.useState(refresh);

    const { data, loading, error, refetch } = useGetPostsQuery({
      variables: {
      },
    });

    React.useEffect( () => {
      refetch();
    },[refresh, reFresh, refetch])

    const history = useHistory()
    const go = async(path: string) => {
      history.replace(path)
    }

    if(error?.message.includes("Login/Register to Continue")) go("/")
    
    return (
      <div>
        {loading && <div>Loading...</div>}
        {error && <div>{error.message}</div>}
        {data?.fetchAllPost?.length === 0 && <div>No Posts!</div>}
        {data &&
          <Flex flexWrap="wrap" justify="space-evenly">
            {data?.fetchAllPost?.map((_data: any) => <ViewPost post={_data.title} postID={_data._id} reFresh={reFresh} setReFresh={setReFresh}/>)}
          </Flex>
        }
      </div>
    );
}