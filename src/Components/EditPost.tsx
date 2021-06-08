import React from "react";
import { Button, FormControl, FormErrorMessage, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea } from "@chakra-ui/react";
import { UpdatePostComponent } from "../generated/graphql";
import { Field, Form, Formik } from "formik";
import { useHistory } from "react-router-dom";

interface UpdatePostFormValues {
  title: string
}


export default function EditPost({isOpen, onClose, post, postID}: {isOpen: boolean, onClose: ()=>void, post: string, postID: number}) {

  const initialValues: UpdatePostFormValues = {title: post}

  const history = useHistory()
  const go = async(path: string) => {
    history.replace(path)
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
        <UpdatePostComponent>
          {updatePost => (
          <Formik
            initialValues={initialValues}
            onSubmit={async (values, actions) => {
              try {
                const response = await updatePost({
                  variables: {
                    postID: parseFloat(postID.toString()),
                    post: values 
                  }
                })
                console.log(response)
                // setRefresh(!refresh)
                onClose();
              } catch (err) {
                const errors: { [key: string]: string } = {};
                if(err.graphQLErrors[0].message.includes("Login/Register to Continue")) go("/");
                err.graphQLErrors[0].validationErrors.forEach(
                  (validationErr: any) => {
                    Object.values(validationErr.constraints).forEach(
                      (message: any) => {
                        errors[validationErr.property] = message;
                      }
                    );
                  }
                );
                actions.setErrors(errors);
              }
            }}
          >
            {(props) => (
              <Form>
                <Field name="title">
                  {({ field, form } :{field: any, form: any}) => (
                    <ModalContent>
                      <ModalHeader>Edit Post</ModalHeader>
                      <ModalCloseButton />
                      <ModalBody>
                        <FormControl isInvalid={form.errors.title && form.touched.title}>
                          <Textarea {...field} name="title" id="title" placeholder="Enter New Post"/>
                          <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                        </FormControl>
                      </ModalBody>
                      <ModalFooter>
                        <Button mt="10px" isFullWidth={true} isLoading={props.isSubmitting} type="submit">Save Changes</Button>
                      </ModalFooter>
                    </ModalContent>
                  )}
                </Field>
              </Form>
            )}
          </Formik>
          )}
      </UpdatePostComponent>
    </Modal>
);
}