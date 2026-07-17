import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteApplication } from "../api/applications";

interface DeleteApplicationProps {
  id: number;
}

const DeleteApplication = ({ id }: DeleteApplicationProps) => {
  const queryClient = useQueryClient();

  const { mutate, isError, error } = useMutation({
    mutationFn: deleteApplication,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
    },
  })

  return (
    <div>
      <div className="flex justify-end">
        <button
          className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          onClick={() => mutate(id)}
          type="button"
        >
          Delete
        </button>
      </div>

      {isError && (
        <div
          className="mt-3 rounded-md border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800"
          role="alert"
        >
          {error.message}
        </div>
      )}
    </div>
  )
}

export default DeleteApplication