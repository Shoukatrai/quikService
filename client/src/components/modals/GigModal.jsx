import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { X, Save, ToggleLeft, ToggleRight } from "lucide-react";
import axios from "axios";
import Cookies from "js-cookie";
const EditGigModal = ({ isOpen, onClose, gig, onUpdateSuccess }) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,

    formState: { errors, isDirty, dirtyFields },
  } = useForm();

  const isActive = watch("isActive");

  useEffect(() => {
    if (gig) {
      reset({
        title: gig.title,
        description: gig.description,
        category: gig.category,
        price: gig.pricing?.rate || gig.price,
        isActive: gig.isActive ?? true,
      });
    }
  }, [gig, reset]);

  const onSubmit = async (data) => {
    try {
      const editFields = Object.keys(dirtyFields).reduce((acc, key) => {
        acc[key] = data[key];
        return acc;
      }, {});

      console.log("Only Changed Fields:", editFields);

      if (Object.keys(editFields).length === 0) {
        return onClose();
      }

      const response = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/post/edit-gig/${gig._id}`,
        editFields,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        },
      );

      if (response.data.success) {
        onUpdateSuccess(response.data.updatedGig);
        onClose();
      }
    } catch (error) {
      console.error("Update failed:", error?.response?.data || error.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <h2 className="text-xl font-bold text-slate-800">Edit Your Gig</h2>
            <p className="text-xs text-slate-500">
              Update your service details and availability
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-200 rounded-full transition-colors"
          >
            <X size={20} className="text-slate-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <div>
              <p className="text-sm font-bold text-slate-800">Gig Status</p>
              <p className="text-xs text-slate-500">
                {isActive
                  ? "Your gig is currently visible to clients"
                  : "Your gig is hidden from search"}
              </p>
            </div>
            <button
              type="button"
              onClick={() =>
                setValue("isActive", !isActive, { shouldDirty: true })
              }
              className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors outline-none ${
                isActive ? "bg-green-500" : "bg-slate-300"
              }`}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                  isActive ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
            <input type="hidden" {...register("isActive")} />
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Gig Title
            </label>
            <input
              {...register("title", { required: "Title is required" })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
            />
            {errors.title && (
              <p className="text-xs text-red-500 mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Category
              </label>
              <select
                {...register("category")}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
              >
                <option value="Plumbing">Plumbing</option>
                <option value="Electrical">Electrician</option>
                <option value="Cleaning">Cleaning</option>
                <option value="Moving">Moving</option>
                <option value="Painting">Painting</option>
                <option value="Gardening">Gardening</option>
                <option value="Other">Other</option>
              </select>
              {errors.category && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.category.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Price (PKR)
              </label>
              <input
                type="number"
                {...register("price", { required: "Price is required" })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
              {errors.price && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.price.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Description
            </label>
            <textarea
              rows="3"
              {...register("description")}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
            ></textarea>
            {errors.description && (
              <p className="text-xs text-red-500 mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-100 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!isDirty}
              className={`flex items-center gap-2 px-8 py-2.5 rounded-xl text-sm font-bold text-white shadow-lg transition-all ${
                isDirty
                  ? "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200"
                  : "bg-slate-300 cursor-not-allowed"
              }`}
            >
              <Save size={18} /> Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default EditGigModal;
