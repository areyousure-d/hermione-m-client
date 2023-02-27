import { Button, Group, Stack, Text, Textarea } from "@mantine/core";
import { useUnit } from "effector-react";
import { ChangeEvent, FormEvent, useState } from "react";

import { Card } from "@/entities/card";
import { ModalWithLoading } from "@/shared/ui/modal-with-loading";

import { updateCardMutation } from "./model";

type Props = {
  card: Card;
};

export const UpdateCard = ({ card }: Props) => {
  const [modalOpened, setModalOpened] = useState(false);

  const openModal = () => setModalOpened(true);
  const closeModal = () => setModalOpened(false);

  const [updateCardMutationFailed] = useUnit([updateCardMutation.$failed]);

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
    start({ ...card, ...formValues });
    setFormValues({
      front: card.front,
      back: card.back,
    });
    closeModal();
  };

  return (
    <>
      <Button color="violet" size="xs" variant="light" onClick={openModal}>
        Update card
      </Button>

      <ModalWithLoading
        opened={modalOpened}
        onClose={closeModal}
        loading={pending}
        title="Update deck"
        size="xl"
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

            <Group position="right">
              <Button type="submit">Update card</Button>
            </Group>
          </Stack>
        </form>
      </ModalWithLoading>
    </>
  );
};
