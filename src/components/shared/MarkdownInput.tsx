import { Control, ControllerRenderProps } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { MARKDOWN_PLACEHOLDER } from "@/lib/constants";
import { Textarea } from "../ui/textarea";
import { ChangeEventHandler } from "react";
import { Card, CardContent } from "../ui/card";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { ScrollArea } from "../ui/scroll-area";

type MarkdownInputProps = {
  formControl: Control<any>;
  value: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  variant?: "full" | "tabs";
  name: string;
  label: string;
};

const MdPreview = ({ value }: Pick<MarkdownInputProps, "value">) => {
  return (
    <Card className="h-72">
      <ScrollArea className="h-72 relative">
        <span className="absolute text-slate-400 text-sm right-8 top-4">
          Markdown preview
        </span>
        <CardContent className="pt-4 pb-8">
          <ReactMarkdown className="markdown">
            {value.length > 0 ? value : MARKDOWN_PLACEHOLDER}
          </ReactMarkdown>
        </CardContent>
      </ScrollArea>
    </Card>
  );
};

const MdInput = ({
  field,
  value,
  onChange,
}: Pick<MarkdownInputProps, "value" | "onChange"> & {
  field: ControllerRenderProps<any, string>;
}) => {
  return (
    <FormControl>
      <Textarea
        {...field}
        placeholder={MARKDOWN_PLACEHOLDER}
        value={value}
        onChange={onChange}
        className="h-72 pt-4 pb-8 px-4 text-base resize-none"
      />
    </FormControl>
  );
};

const MarkdownInput = ({
  value,
  variant = "full",
  ...props
}: MarkdownInputProps) => {
  return (
    <FormField
      control={props.formControl}
      name={props.name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{props.label}</FormLabel>
          {variant === "tabs" ? (
            <Tabs defaultValue="input" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="input">Input</TabsTrigger>
                <TabsTrigger value="preview">Preview</TabsTrigger>
              </TabsList>
              <TabsContent value="input">
                <MdInput
                  field={field}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                    props.onChange(e);
                  }}
                  value={value}
                />
              </TabsContent>
              <TabsContent value="preview">
                <MdPreview value={value} />
              </TabsContent>
            </Tabs>
          ) : (
            <div className="grid grid-cols-2 gap-4 items-end">
              <MdInput field={field} onChange={props.onChange} value={value} />
              <MdPreview value={value} />
            </div>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
  // if (variant === "tabs")
  //   return (
  //     <div className="space-y-2">
  //       <FormLabel>{props.label}</FormLabel>
  //       <Tabs defaultValue="input" className="w-full">
  //         <TabsList className="grid w-full grid-cols-2">
  //           <TabsTrigger value="input">Input</TabsTrigger>
  //           <TabsTrigger value="preview">Preview</TabsTrigger>
  //         </TabsList>
  //         <TabsContent value="input">
  //           <MdInput {...props} value={value} />
  //         </TabsContent>
  //         <TabsContent value="preview">
  //           <MdPreview value={value} />
  //         </TabsContent>
  //       </Tabs>
  //     </div>
  //   );

  // return (
  //   <div className="space-y-2">
  //     <FormLabel>{props.label}</FormLabel>
  //     <div className="grid grid-cols-2 gap-4 items-end">
  //       <MdInput {...props} value={value} />
  //       <MdPreview value={value} />
  //     </div>
  //   </div>
  // );
};

export default MarkdownInput;
