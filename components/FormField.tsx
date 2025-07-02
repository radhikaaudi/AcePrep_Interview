
import React from 'react'
import { Input } from "@/components/ui/input"
import { Controller, FieldValues, Path, Control } from 'react-hook-form'
//import { Label } from '@radix-ui/react-label';  

import { 
  FormItem, 
  FormLabel, 
  FormControl, 
 
  FormMessage 
} from "@/components/ui/form";

interface FormFieldProps<T extends FieldValues>{
  control: Control<T>;
    name: Path<T>;
    label : string;
    placeholder?: string;
    type?: 'text' | 'email' | 'password';} // Optional, default to "text"

   // Replace with the correct type for your control

const FormField = ({control, name, 
    label, 
    placeholder ,
    type="text" } : FormFieldProps<T>) => (
          <Controller name ={name} 
          control ={control} 
          render={({ field }) => (

            <FormItem>
              <FormLabel className='label'>{label}</FormLabel>
              <FormControl>
                <Input className='input'
                 placeholder={placeholder} 
                 type={type}
                 {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
        
);

export default FormField