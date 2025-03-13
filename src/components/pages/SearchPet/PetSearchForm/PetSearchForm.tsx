import { FC } from 'react';

import { Props } from './types';
import { Button } from '@/components/atoms/Button';
import { FormInput, FormSelect } from '@/components/organisms/FormElements';
import { ADOPTABLE_OPTIONS, AGE_OPTIONS, SIZE_OPTIONS } from './constants';

export const PetSearchForm: FC<Props> = (props) => {
  const { handleSubmit, isSending } = props;

  return (
    <div className="w-full flex lg:flex-row flex-wrap items-end gap-4">
      <FormInput label="Name" name="name" placeholder="Pet name" />
      <FormSelect label="Size" name="size" options={SIZE_OPTIONS} />
      <FormSelect label="Age" name="age" options={AGE_OPTIONS} />
      <FormSelect label="Adoptable status" name="status" options={ADOPTABLE_OPTIONS} />
      <Button onClick={handleSubmit} disabled={isSending}>
        Send
      </Button>
    </div>
  );
};
PetSearchForm.displayName = 'PetSearchForm';
