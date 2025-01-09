import { z } from "zod";
import { Reparation } from "../../types/Reparation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import reparationService from "../../services/reparationService";
import Button from "../UI/Button";

const formSchema = z.object({
  descriptionTravail: z.string().min(1, "Description is required"),
});
type FormValues = z.infer<typeof formSchema>;

type UpdateReparationProps = {
  reparation: Reparation;
  toggle: (isEditing: boolean) => void;
};

const UpdateReparationForm = ({ reparation, toggle }: UpdateReparationProps) => {
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
    await updateReparation(data, reparation.id);
    console.log("updated")
    toggle?.(false);
    reset();
  };

  const updateReparation = async (formData: FormValues, id: number) => {
    try {
      const response = await reparationService.updateReparation(formData.descriptionTravail, id);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="card" onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="flex flex-col gap-2 w-fit">
        <div>
          <textarea
            className="border border-gray-500 rounded p-2 h-28"
            placeholder="Décrivez le problème ..."
            {...register("descriptionTravail")}
          />
          {errors.descriptionTravail && <p className="error">{errors.descriptionTravail.message}</p>}
        </div>
      </div>
      <div className="flex justify-end mt-4">
        <Button title="update" type="submit" />
      </div>
    </form>
  );
};

export default UpdateReparationForm;
