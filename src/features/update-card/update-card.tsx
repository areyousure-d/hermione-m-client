import { Button, Stack, Text, Textarea } from "@mantine/core";
import { useUnit } from "effector-react";
import { ChangeEvent, FormEvent, useState } from "react";

import { Card } from "@/entities/card";
import { ModalForm } from "@/shared/ui/modal-form";

import {
  $isError,
  $isModalOpened,
  closeModal,
  openModal,
  submitted,
  updateCardFx,
} from "./model";

type Props = {
  card: Card;
};

export const UpdateCard = ({ card }: Props) => {
  const [submit, loading, isError, openModalFn, closeModalFn, isModalOpened] =
    useUnit([
      submitted,
      updateCardFx.pending,
      $isError,
      openModal,
      closeModal,
      $isModalOpened,
    ]);

  const [formValues, setFormValues] = useState({
    front: card.front,
    back: card.back,
  });

  const onChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { value, name } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    submit({ ...card, ...formValues });
    setFormValues({
      front: card.front,
      back: card.back,
    });
  };

  return (
    <>
      <Button onClick={openModalFn}>Update card</Button>

      <ModalForm
        title="Update card"
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

            <Button type="submit">Update card</Button>
          </Stack>
        </form>
      </ModalForm>
    </>
  );
};
