import { useEffect, useState, type FormEvent } from "react";
import { IoTrashOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../app/store";
import { icon } from "../assets";
import { api } from "../service";
import { useNavigate } from "react-router-dom";
import { authActions } from "../app/features/auth/authSlice";
import { toast } from "react-toastify";

interface Note {
  _id: string;
  title: string;
  content: string;
}

export default function Home() {
  const { user } = useSelector((state: RootState) => state.auth);
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [showDelete, setShowDelete] = useState<{ open: boolean; id?: string }>({
    open: false,
  });
  const [newNote, setNewNote] = useState({ title: "", content: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const fetchNotes = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/notes");
      setNotes(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleCreate = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/notes/create", newNote);
      setShowCreate(false);
      setNewNote({ title: "", content: "" });
      fetchNotes();
    } catch (err) {
      console.error(err);
    }
  };

  const confirmDelete = (id: string) => {
    setShowDelete({ open: true, id });
  };

  const handleDelete = async () => {
    if (!showDelete.id) return;
    try {
      await api.delete(`/notes/${showDelete.id}`);
      setShowDelete({ open: false });
      fetchNotes();
    } catch (err) {
      console.error(err);
    }
  };

  const signOut = async () => {
    try {
      await api.post("/auth/logout");
      dispatch(authActions.logout());
      toast.success("Signed out successfully");
      navigate("/login");
    } catch {
      toast.error("Failed to sign out");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-4 md:py-0">
      <main className="max-w-md mx-auto mt-8 space-y-6">
        {/* Header  */}
        <div className="w-full flex items-start justify-between py-2">
          <div className="">
            <img src={icon} alt="Logo" className="w-8 mx-auto mb-4" />
          </div>

          <h1 className="text-xl font-medium text-[#232323]">Dashboard</h1>

          <button
            onClick={signOut}
            className="text-[#367AFF] text-sm font-semibold underline cursor-pointer hover:scale-[1.02] transition"
          >
            Sign Out
          </button>
        </div>

        {/* Welcome Card */}
        <div className="bg-white rounded-xl px-4 py-8 shadow-md">
          <h2 className="text-xl font-bold text-[#232323]">
            Welcome, {user?.name} !
          </h2>
          <p className="text-gray-600 mt-1">Email: {user?.email}</p>
        </div>

        {/* Create Note Button */}
        <button
          onClick={() => setShowCreate(true)}
          className="w-full py-3 bg-[#367AFF] text-white rounded-lg font-medium cursor-pointer hover:scale-[1.02] transition"
        >
          Create Note
        </button>

        {/* Notes List */}
        <div className="space-y-4">
          <h1 className="text-xl font-medium text-[#232323]">Notes</h1>
          <div className="max-h-[200px] overflow-y-scroll p-4 space-y-4">
            {loading ? (
              "Loading..."
            ) : notes.length === 0 ? (
              <div className="text-gray-500 text-sm py-2 text-center">
                <p>No notes found</p>
              </div>
            ) : (
              notes.map((note) => (
                <div
                  key={note._id}
                  className="bg-white rounded-xl shadow-md p-4 flex justify-between items-center"
                >
                  <div>
                    <h3 className="font-medium">{note.title}</h3>
                    <p className="text-gray-500 text-sm mt-1">{note.content}</p>
                  </div>
                  <button
                    onClick={() => confirmDelete(note._id)}
                    className="text-gray-400 hover:text-red-600 cursor-pointer"
                  >
                    <IoTrashOutline size={24} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      {/* Create Note Modal */}
      {showCreate && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-80">
            <h3 className="text-lg font-semibold mb-4">New Note</h3>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="flex flex-col">
                <label htmlFor="title" className="mb-1 text-gray-600">
                  Title
                </label>
                <input
                  id="title"
                  value={newNote.title}
                  onChange={(e) =>
                    setNewNote((n) => ({ ...n, title: e.target.value }))
                  }
                  required
                  className="px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="content" className="mb-1 text-gray-600">
                  Content
                </label>
                <textarea
                  id="content"
                  value={newNote.content}
                  onChange={(e) =>
                    setNewNote((n) => ({ ...n, content: e.target.value }))
                  }
                  rows={4}
                  required
                  className="px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowCreate(false)}
                  className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDelete.open && (
        <div className="fixed inset-0 bg-black/30  flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-80 text-center">
            <h3 className="text-lg font-semibold mb-4">Delete this note?</h3>
            <p className="text-gray-600 mb-6">This action cannot be undone.</p>
            <div className="flex justify-center space-x-2">
              <button
                onClick={() => setShowDelete({ open: false })}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
