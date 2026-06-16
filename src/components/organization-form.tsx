'use client';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel } from './ui/form';
import { Input } from './ui/input';
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from '@/components/ui/field';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  OrganizationFormValues,
  organizationSchema,
} from '@/lib/validators/organizaton';
import { zodResolver } from '@hookform/resolvers/zod';
import { Organization } from '@/generated/prisma/client';
import { Button } from './ui/button';
import updateOrganizationAction from '@/app/actions/organization';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

type Props = { organization: Organization };

export default function OrganizationForm({ organization }: Props) {
  const form = useForm<OrganizationFormValues>({
    resolver: zodResolver(organizationSchema),
    defaultValues: {
      name: organization.name,
      type: organization.type,
      cui: organization.cui ?? '',
      regCom: organization.regCom ?? '',
    },
  });

  const onSubmit = async (values: OrganizationFormValues) => {
    const result = await updateOrganizationAction(organization.id, values);

    if (result?.error) {
      toast.error(result.error);
      return;
    }

    toast.success('Organization update');
  };

  const router = useRouter();
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col gap-8 mt-4'
      >
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Organization name</FormLabel>
              <FormControl>
                <Input
                  className='max-w-md bg-slate-50 text-sm font-normal hover:ring-1 ring-indigo-500/90 transition'
                  placeholder='Name'
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='type'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Organization Type</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className='w-full flex justify-between'
                >
                  <FieldLabel htmlFor='individual'>
                    <Field orientation='horizontal'>
                      <FieldContent>
                        <FieldTitle>Individual / PFA</FieldTitle>
                        <FieldDescription>
                          For individuals and freelancher
                        </FieldDescription>
                      </FieldContent>
                      <RadioGroupItem value='INDIVIDUAL' id='individual' />
                    </Field>
                  </FieldLabel>
                  <FieldLabel htmlFor='company'>
                    <Field orientation='horizontal'>
                      <FieldContent>
                        <FieldTitle>Company / SRL</FieldTitle>
                        <FieldDescription>
                          Registered legal entity
                        </FieldDescription>
                      </FieldContent>
                      <RadioGroupItem value='COMPANY' id='company' />
                    </Field>
                  </FieldLabel>
                </RadioGroup>
              </FormControl>
            </FormItem>
          )}
        />
        <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
          <FormField
            control={form.control}
            name='cui'
            render={({ field }) => (
              <FormItem>
                <FormLabel>CUI / Tax ID</FormLabel>
                <FormControl>
                  <Input
                    className='bg-slate-50 text-sm font-normal hover:ring-1 ring-indigo-500/90 transition placeholder:text-slate-300/90'
                    placeholder='RO12345678'
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='regCom'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Reg. Com.</FormLabel>
                <FormControl>
                  <Input
                    className='bg-slate-50 text-sm font-normal hover:ring-1 ring-indigo-500/90 transition placeholder:text-slate-300/90'
                    placeholder='J40/1234/2020'
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className='flex justify-end items-center gap-2'>
          <Button
            className='bg-slate-50 text-slate-900 ring ring-slate-300/90 hover:bg-slate-100/90'
            type='button'
            onClick={() => router.push('/dashboard')}
          >
            Cancel
          </Button>
          <Button
            className='bg-linear-to-r from-blue-600 to-purple-500 px-8 text-base hover:-translate-y-px duration-200 transition'
            type='submit'
          >
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
}
