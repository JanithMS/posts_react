import React from "react";
import { Button, FormControl, FormErrorMessage, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { AddPostComponent } from "../generated/graphql";
import { Field, Form, Formik } from "formik";
import { useHistory } from "react-router-dom";

interface AddPostFormValues {
  title: string
}

export default function AddPost({isOpen, onClose, refresh, setRefresh}: {isOpen: boolean, onClose: ()=>void, refresh: boolean, setRefresh: Function}) {

  const initialValues: AddPostFormValues = {title: ""}

  const history = useHistory()
  const go = async(path: string) => {
    history.replace(path)
  }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
            <AddPostComponent>
              {addPost => (
              <Formik
                initialValues={initialValues}
                onSubmit={async (values, actions) => {
                  try {
                    const response = await addPost({
                      variables: {
                        post: values 
                      }
                    })
                    console.log(response)
                    setRefresh(!refresh)
                    onClose();
                  } catch (err) {
                    if(err.graphQLErrors[0].message.includes("Login/Register to Continue")) go("/");
                    const errors: { [key: string]: string } = {};
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
                          <ModalHeader>New Post</ModalHeader>
                          <ModalCloseButton />
                          <ModalBody>
                            <FormControl isInvalid={form.errors.title && form.touched.title}>
                              <Textarea {...field} name="title" id="title" placeholder="Enter New Post"/>
                              <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                            </FormControl>
                          </ModalBody>
                          <ModalFooter>
                            <Button mt="10px" isFullWidth={true} isLoading={props.isSubmitting} type="submit"><AddIcon/></Button>
                          </ModalFooter>
                        </ModalContent>
                      )}
                    </Field>
                  </Form>
                )}
              </Formik>
              )}
          </AddPostComponent>
        </Modal>
    );
}