import { Button, Stack, Text, Textarea } from "@mantine/core";
import { useUnit } from "effector-react";
import { ChangeEvent, FormEvent, useState } from "react";

import { Card } from "@/entities/card";
import { ModalWithLoading } from "@/shared/ui/modal-with-loading";

import {
  $modalOpened,
  $updateCardMutationFailed,
  closeModal,
  openModal,
  updateCardMutation,
} from "./model";

type Props = {
  card: Card;
};

export const UpdateCard = ({ card }: Props) => {
  const [openModalFn, closeModalFn, modalOpened, updateCardMutationFailed] =
    useUnit([openModal, closeModal, $modalOpened, $updateCardMutationFailed]);

  const { start, pending } = useUnit(updateCardMutation);

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
    start({ body: { ...card, ...formValues } });
    setFormValues({
      front: card.front,
      back: card.back,
    });
  };

  return (
    <>
      <Button onClick={openModalFn}>Update card</Button>

      <ModalWithLoading
        opened={modalOpened}
        onClose={closeModalFn}
        loading={pending}
        title="Update deck"
      >
        {updateCardMutationFailed && (
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
      </ModalWithLoading>
    </>
  );
};
