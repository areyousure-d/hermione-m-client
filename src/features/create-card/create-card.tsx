import { Button, Stack, Text, Textarea } from "@mantine/core";
import { useUnit } from "effector-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { useParams } from "react-router-dom";

import { ModalWithLoading } from "@/shared/ui/modal-with-loading";

import {
  $createCardMutationFailed,
  $modalOpened,
  closeModal,
  createCardMutation,
  openModal,
} from "./model";

const initialFormValues = {
  front: "",
  back: "",
};

export const CreateCard = () => {
  const { deckId } = useParams();

  const [createCardMutationFailed, openModalFn, closeModalFn, modalOpened] =
    useUnit([$createCardMutationFailed, openModal, closeModal, $modalOpened]);

  const { start, pending } = useUnit(createCardMutation);

  const [formValues, setFormValues] = useState(initialFormValues);

  const onChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { value, name } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (deckId) {
      start({ body: { ...formValues, deck_id: Number(deckId) } });
      setFormValues(initialFormValues);
    }
  };

  return (
    <>
      <Button onClick={openModalFn}>Create card</Button>

      <ModalWithLoading
        opened={modalOpened}
        onClose={closeModalFn}
        loading={pending}
        title="Create deck"
      >
        {createCardMutationFailed && (
          <Text fz="md" color="red.7">
            Create card error
          </Text>
        )}

        <form onSubmit={onSubmit}>
          <Stack>
            <Textarea
              placeholder="Question"
              label="Question"
              name="front"
              autosize
              minRows={3}
              value={formValues.front}
              onChange={onChange}
            />

            <Textarea
              placeholder="Answer"
              label="Answer"
              name="back"
              autosize
              minRows={3}
              value={formValues.back}
              onChange={onChange}
            />

            <Button type="submit">Create card</Button>
          </Stack>
        </form>
      </ModalWithLoading>
    </>
  );
};
