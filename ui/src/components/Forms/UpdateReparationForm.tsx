import { z } from "zod";
import { Reparation } from "../../types/Reparation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../UI/Button";
import { useReparation } from "../../context/ReparationContext"; // Import the custom hook
const formSchema = z.object({
  descriptionTravail: z.string().min(1, "Description is required"),
});
type FormValues = z.infer<typeof formSchema>;

type UpdateReparationProps = {
  reparation: Reparation;
  toggle: (isEditing: boolean) => void;
};

const UpdateReparationForm = ({ toggle }: UpdateReparationProps) => {
  const { reparation, updateReparation } = useReparation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: reparation
      ? { descriptionTravail: reparation.descriptionTravail }
      : undefined,
    resolver: zodResolver(formSchema),
  });
  

  const handleFormSubmit = async (data: FormValues) => {
    await updateReparation(data.descriptionTravail, reparation!.id);
    console.log("updated")
    toggle?.(false);
    reset();
  };



  return (
    <form className="card" onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="flex flex-col gap-2 w-fit">
        <div>
          <textarea
            className="border border-gray-500 rounded p-2 h-28 w-[400px]"
            placeholder="Décrivez le travail réalisé."
            {...register("descriptionTravail")}
          />
          {errors.descriptionTravail && <p className="error">{errors.descriptionTravail.message}</p>}
        </div>
      </div>
      <div className="flex justify-end mt-4">
        <Button title={reparation!.descriptionTravail ? "Modifier" : "Ajouter"} type="submit" />
      </div>
    </form>
  );
};

export default UpdateReparationForm;
