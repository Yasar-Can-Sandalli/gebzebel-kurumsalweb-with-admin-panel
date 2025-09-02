// src/sayfalar/kurumsal/UsersPage.tsx
import { useEffect, useRef, useState, useMemo } from "react";
import { Users, Filter, ChevronDown, ChevronUp, MoreHorizontal, Plus, Trash, Edit, Eye } from "lucide-react";
//import AdminLayout from "../_LayoutAdminPanel";
import { useSearch } from "../context/SearchContext";
import { fetchUsers, User, updateUser, deleteUser } from "../services/userService";
import { useClickOutside } from "../../useClickOutside";
import Loader from "../../loader";
import EditUserModal from "../users/EditUserModal";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const roleOptions = ["Tüm Roller", "Admin", "Editor", "User"];
const statusOptions = ["Tüm Durumlar", "Aktif", "Pasif", "Beklemede"];

export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedRole, setSelectedRole] = useState("Tüm Roller");
    const [selectedStatus, setSelectedStatus] = useState("Tüm Durumlar");
    const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
    const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
    const [sortField, setSortField] = useState<keyof User>("tcno");
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
    const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
    const { searchQuery, setSearchQuery } = useSearch();
    const actionDropdownRef = useRef<HTMLDivElement>(null);
    const [actionDropdownId, setActionDropdownId] = useState<number | null>(null);

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [currentUserToEdit, setCurrentUserToEdit] = useState<User | null>(null);

    const { hasPermission } = useAuthStore();
    const canView = hasPermission("kullanıcılar", "goruntuleme");
    const canEdit = hasPermission("kullanıcılar", "duzenleme");
    const canDelete = hasPermission("kullanıcılar", "silme");
    const canAdd = hasPermission("kullanıcılar", "ekleme");

    useEffect(() => {
        if (!canView) {
            setLoading(false);
            return;
        }
        let mounted = true;
        (async () => {
            try {
                setLoading(true);
                const data = await fetchUsers();
                if (mounted) setUsers(data);
            } finally {
                if (mounted) setLoading(false);
            }
        })();
        return () => {
            mounted = false;
        };
    }, [canView]);

    useClickOutside(actionDropdownRef, () => setActionDropdownId(null));

    const handleDeleteUser = async (userId: number) => {
        if (!window.confirm("Kullanıcı silinsin mi?")) return;
        await deleteUser(userId);
        setUsers((prev) => prev.filter((u) => u.id !== userId));
        setActionDropdownId(null);
    };

    const filteredAndSortedUsers = useMemo(() => {
        return users
            .filter((user) => {
                const status = user?.status ?? "";
                const tcno = user?.tcno?.toString() ?? "";
                const isim = user?.isim?.toLowerCase() ?? "";
                const searchLower = (searchQuery || "").toLowerCase();

                const matchesSearch = tcno.includes(searchLower) || isim.includes(searchLower);
                const matchesStatus = selectedStatus === "Tüm Durumlar" || status === selectedStatus;
                const matchesRole = selectedRole === "Tüm Roller" || true; // rol alanın yoksa geç
                return matchesSearch && matchesStatus && matchesRole;
            })
            .sort((a, b) => {
                const A = a[sortField] ?? "";
                const B = b[sortField] ?? "";
                if (sortField === "tcno") {
                    const va = Number(A);
                    const vb = Number(B);
                    return sortDirection === "asc" ? va - vb : vb - va;
                }
                if (A < B) return sortDirection === "asc" ? -1 : 1;
                if (A > B) return sortDirection === "asc" ? 1 : -1;
                return 0;
            });
    }, [users, searchQuery, selectedRole, selectedStatus, sortField, sortDirection]);

    const handleSort = (field: keyof User) => {
        setSortField((prev) => (prev === field ? prev : field));
        setSortDirection((prev) => (sortField === field ? (prev === "asc" ? "desc" : "asc") : "asc"));
    };

    const toggleSelectAll = () => {
        if (selectedUsers.length === filteredAndSortedUsers.length && filteredAndSortedUsers.length > 0) {
            setSelectedUsers([]);
        } else {
            setSelectedUsers(filteredAndSortedUsers.map((u) => u.id));
        }
    };

    const toggleSelectUser = (id: number) => {
        setSelectedUsers((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
    };

    const handleSaveUser = async (userid: number, updatedUser: User) => {
        const saved = await updateUser(userid, updatedUser);
        setUsers((prev) => prev.map((u) => (u.id === saved.id ? saved : u)));
        setIsEditModalOpen(false);
        setCurrentUserToEdit(null);
    };

    const handleClearFilters = () => {
        setSelectedRole("Tüm Roller");
        setSelectedStatus("Tüm Durumlar");
        setSearchQuery("");
    };

    if (loading) return <Loader />;

    if (!canView) {
        return (

                <div className="flex items-center justify-center h-96">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Yetkisiz Erişim</h2>
                        <p className="text-gray-600">Bu sayfayı görüntülemek için yetkiniz yok.</p>
                    </div>
                </div>

        );
    }

    return (

            <main className="flex-1 overflow-y-auto p-6">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">Kullanıcılar</h2>
                        <p className="text-gray-500">Kullanıcıları listele ve yönet</p>
                    </div>
                    {canAdd && (
                        <Link to="/panel/users/yeni" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center">
                            <Plus size={20} className="mr-2" />
                            Kullanıcı Ekle
                        </Link>
                    )}
                </div>

                {/* Filtreler */}
                <div className="bg-white p-4 rounded-lg shadow mb-6">
                    <div className="flex flex-wrap items-center gap-4">
                        <div className="text-gray-700 font-medium">Filters:</div>

                        {/* Role */}
                        <div className="relative">
                            <button
                                onClick={() => {
                                    setIsRoleDropdownOpen(!isRoleDropdownOpen);
                                    setIsStatusDropdownOpen(false);
                                }}
                                className="flex items-center px-3 py-2 bg-gray-100 rounded-lg text-gray-700 hover:bg-gray-200"
                            >
                                <Filter size={16} className="mr-2" />
                                {selectedRole}
                                {isRoleDropdownOpen ? <ChevronUp size={16} className="ml-2" /> : <ChevronDown size={16} className="ml-2" />}
                            </button>
                            {isRoleDropdownOpen && (
                                <div className="absolute z-10 mt-2 w-48 bg-white rounded-md shadow-lg">
                                    <ul className="py-1">
                                        {roleOptions.map((role) => (
                                            <li key={role}>
                                                <button
                                                    onClick={() => {
                                                        setSelectedRole(role);
                                                        setIsRoleDropdownOpen(false);
                                                    }}
                                                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                                                        selectedRole === role ? "bg-blue-50 text-blue-700" : ""
                                                    }`}
                                                >
                                                    {role}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        {/* Status */}
                        <div className="relative">
                            <button
                                onClick={() => {
                                    setIsStatusDropdownOpen(!isStatusDropdownOpen);
                                    setIsRoleDropdownOpen(false);
                                }}
                                className="flex items-center px-3 py-2 bg-gray-100 rounded-lg text-gray-700 hover:bg-gray-200"
                            >
                                <Filter size={16} className="mr-2" />
                                {selectedStatus}
                                {isStatusDropdownOpen ? <ChevronUp size={16} className="ml-2" /> : <ChevronDown size={16} className="ml-2" />}
                            </button>
                            {isStatusDropdownOpen && (
                                <div className="absolute z-10 mt-2 w-48 bg-white rounded-md shadow-lg">
                                    <ul className="py-1">
                                        {statusOptions.map((status) => (
                                            <li key={status}>
                                                <button
                                                    onClick={() => {
                                                        setSelectedStatus(status);
                                                        setIsStatusDropdownOpen(false);
                                                    }}
                                                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                                                        selectedStatus === status ? "bg-blue-50 text-blue-700" : ""
                                                    }`}
                                                >
                                                    {status}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        {(selectedRole !== "Tüm Roller" || selectedStatus !== "Tüm Durumlar" || searchQuery) && (
                            <button onClick={handleClearFilters} className="text-blue-600 hover:text-blue-800 text-sm">
                                Filtreleri temizle
                            </button>
                        )}
                    </div>
                </div>

                {/* Tablo */}
                <div className="bg-white rounded-lg shadow">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-3 text-left">
                                    <input
                                        type="checkbox"
                                        className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                                        checked={filteredAndSortedUsers.length > 0 && selectedUsers.length === filteredAndSortedUsers.length}
                                        onChange={toggleSelectAll}
                                        disabled={filteredAndSortedUsers.length === 0}
                                    />
                                </th>
                                <th className="px-4 py-3 text-left">
                                    <button onClick={() => handleSort("tcno")} className="flex items-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Tc numarası
                                        {sortField === "tcno" ? (sortDirection === "asc" ? <ChevronUp size={14} className="ml-1" /> : <ChevronDown size={14} className="ml-1" />) : null}
                                    </button>
                                </th>
                                <th className="px-4 py-3 text-left">
                                    <button onClick={() => handleSort("isim")} className="flex items-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        İsim Soyisim
                                        {sortField === "isim" ? (sortDirection === "asc" ? <ChevronUp size={14} className="ml-1" /> : <ChevronDown size={14} className="ml-1" />) : null}
                                    </button>
                                </th>
                                <th className="px-4 py-3 text-left">
                                    <button onClick={() => handleSort("status")} className="flex items-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Statü
                                        {sortField === "status" ? (sortDirection === "asc" ? <ChevronUp size={14} className="ml-1" /> : <ChevronDown size={14} className="ml-1" />) : null}
                                    </button>
                                </th>
                                <th className="px-4 py-3 text-right">Actions</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                            {filteredAndSortedUsers.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-4">
                                        <input
                                            type="checkbox"
                                            className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                                            checked={selectedUsers.includes(user.id)}
                                            onChange={() => toggleSelectUser(user.id)}
                                        />
                                    </td>
                                    <td className="px-4 py-4">
                                        <div className="flex items-center">
                                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm">
                                                {user.isim ? user.isim.charAt(0).toUpperCase() : user.tcno.toString().charAt(0)}
                                            </div>
                                            <div className="ml-3">
                                                <div className="text-sm font-medium text-gray-900">{user.tcno}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4">
                                        <div className="text-sm text-gray-900">{user.isim || "-"}</div>
                                    </td>
                                    <td className="px-4 py-4">
                      <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              user.status === "Aktif"
                                  ? "bg-green-100 text-green-800"
                                  : user.status === "Pasif"
                                      ? "bg-red-100 text-red-800"
                                      : "bg-yellow-100 text-yellow-800"
                          }`}
                      >
                        {user.status}
                      </span>
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium relative">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setActionDropdownId(actionDropdownId === user.id ? null : user.id);
                                            }}
                                            className="text-gray-500 hover:text-gray-700"
                                        >
                                            <MoreHorizontal size={16} />
                                        </button>
                                        {actionDropdownId === user.id && (
                                            <div ref={actionDropdownRef} className="absolute right-4 mt-2 w-48 bg-white rounded-md shadow-lg z-20">
                                                <ul className="py-1">
                                                    <li>
                                                        <button className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                                                            <Eye size={16} className="mr-2" />
                                                            View Details
                                                        </button>
                                                    </li>
                                                    <li>
                                                        {canEdit && (
                                                            <Link to={`/panel/users/${user.id}/edit`} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                                                                <Edit size={16} className="mr-2" />
                                                                Edit User
                                                            </Link>
                                                        )}
                                                    </li>
                                                    <li>
                                                        {canDelete && (
                                                            <button
                                                                onClick={() => handleDeleteUser(user.id)}
                                                                className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
                                                            >
                                                                <Trash size={16} className="mr-2" />
                                                                Kullanıcıyı Sil
                                                            </button>
                                                        )}
                                                    </li>
                                                </ul>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>

                    {filteredAndSortedUsers.length === 0 && (
                        <div className="text-center py-8">
                            <Users size={64} className="mx-auto text-gray-300 mb-4" />
                            <h3 className="text-lg font-medium text-gray-500 mb-1">Kullanıcı bulunamadı</h3>
                            <p className="text-gray-400">Arama veya filtre kriterlerinizi değiştirin</p>
                        </div>
                    )}

                    <div className="px-6 py-4 flex items-center justify-between border-t">
                        <div className="text-sm text-gray-500">
                            Showing <span className="font-medium">{filteredAndSortedUsers.length}</span> of{" "}
                            <span className="font-medium">{users.length}</span> Kullanıcılar
                        </div>
                        <div className="flex items-center space-x-2">
                            <button className="px-3 py-1 border rounded text-sm disabled:opacity-50">Previous</button>
                            <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm">1</button>
                            <button className="px-3 py-1 border rounded text-sm">Next</button>
                        </div>
                    </div>
                </div>

                {/* Modals */}
                <EditUserModal isOpen={isEditModalOpen} onClose={() => { setIsEditModalOpen(false); setCurrentUserToEdit(null); }} user={currentUserToEdit} onSave={handleSaveUser} />
            </main>

    );
}
