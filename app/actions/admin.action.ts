import { Save } from 'lucide-react';
import getAdminRoleModel from "@/models/adminRole";

interface Data {
    username: string;
    email: string;
    role: string;
}


export async function setAdminCurrentRole(data: Data) {

    try {
        const AdminRole = await getAdminRoleModel();
        const newAdminRole = new AdminRole({
            email: data.email,
            currentRole: data.role,
        })

        console.log(data,newAdminRole);

        await newAdminRole.save();

        return {
            success: true,
            message: "Added admin current role",
        };
    }
    catch (err) {
        return { success: false, message: "Something Wrong!!" }
    }

}

export async function deleteAdminCurrentRole(data: Data) {

    try {

        const AdminRole = await getAdminRoleModel();
        const result = await AdminRole.deleteOne({ email: data.email })

        if (result.deletedCount === 0) {
            return {
                success: false,
                message: "Admin role not found"
            }
        }

        return {
            success: true,
            message: "Deleted admin current role",
        };
    }
    catch (err) {
        return { success: false, message: "Something Wrong!!" }
    }

}