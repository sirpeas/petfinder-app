import { FC } from 'react';
import { Recycle } from '@phosphor-icons/react/dist/ssr';
import { Button } from '@/components/atoms/Button';
import { FormInput, FormSelect } from '@/components/organisms/FormElements';
import { ADOPTABLE_OPTIONS, AGE_OPTIONS, SIZE_OPTIONS } from './constants';
import { Props } from './types';

export const PetSearchForm: FC<Props> = (props) => {
  const { handleSubmit, handleReset, isSending } = props;

  return (
    <div className="w-full flex lg:flex-row flex-wrap items-end gap-4">
      <FormInput label="Name" name="name" placeholder="Pet name" />
      <FormSelect label="Size" name="size" options={SIZE_OPTIONS} />
      <FormSelect label="Age" name="age" options={AGE_OPTIONS} />
      <FormSelect label="Adoptable status" name="status" options={ADOPTABLE_OPTIONS} />
      <button type="button" className="text-gray-600 p-2 cursor-pointer" onClick={handleReset}>
        <Recycle size={28} />
      </button>
      <Button onClick={handleSubmit} disabled={isSending}>
        Send
      </Button>
    </div>
  );
};
PetSearchForm.displayName = 'PetSearchForm';
