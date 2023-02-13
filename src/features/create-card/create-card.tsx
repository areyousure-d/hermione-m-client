import { Button, Stack, Text, Textarea } from "@mantine/core";
import { useUnit } from "effector-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { useParams } from "react-router-dom";

import { ModalForm } from "@/shared/ui/modal-form";

import {
  $isError,
  $isModalOpened,
  closeModal,
  createCardFx,
  openModal,
  submitted,
} from "./model";

const initialFormValues = {
  front: "",
  back: "",
};

export const CreateCard = () => {
  const { deckId } = useParams();

  const [submit, loading, isError, openModalFn, closeModalFn, isModalOpened] =
    useUnit([
      submitted,
      createCardFx.pending,
      $isError,
      openModal,
      closeModal,
      $isModalOpened,
    ]);

  const [formValues, setFormValues] = useState(initialFormValues);

  const onChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { value, name } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (deckId) {
      submit({ ...formValues, deck_id: Number(deckId) });
      setFormValues(initialFormValues);
    }
  };

  return (
    <>
      <Button onClick={openModalFn}>Create card</Button>

      <ModalForm
        title="Create deck"
        isModalOpened={isModalOpened}
        closeModal={closeModalFn}
        loading={loading}
      >
        {isError && (
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
      </ModalForm>
    </>
  );
};
