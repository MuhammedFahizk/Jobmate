import apiClient from "../api/client";

export interface ContactSubmission {
    id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    handled: boolean;
    submittedAt: string;
}

export interface CreateContactInput {
    name: string;
    email: string;
    subject: string;
    message: string;
}

interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}

interface RawContact {
    _id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    handled: boolean;
    createdAt: string;
}

interface PaginatedContacts {
    items: RawContact[];
    pagination: { page: number; limit: number; total: number; totalPages: number };
}

// Maps the backend's _id/createdAt onto the id/submittedAt shape your
// AdminContactsPage.tsx already expects from dummy-data.
function toContactSubmission(raw: RawContact): ContactSubmission {
    return {
        id: raw._id,
        name: raw.name,
        email: raw.email,
        subject: raw.subject,
        message: raw.message,
        handled: raw.handled,
        submittedAt: raw.createdAt,
    };
}

const ADMIN_BASE = '/contacts/admin';
const PUBLIC_BASE = '/contact';

// Same signature as the dummy-data version: listContacts().then(setContacts)
export async function listContacts(): Promise<ContactSubmission[]> {
    const { data } = await apiClient.get<ApiResponse<PaginatedContacts>>(ADMIN_BASE, {
        params: { limit: 100 }, // admin inbox — bump if you outgrow one page
    });
    return data.data.items.map(toContactSubmission);
}

export async function getContact(id: string): Promise<ContactSubmission> {
    const { data } = await apiClient.get<ApiResponse<RawContact>>(`${ADMIN_BASE}/${id}`);
    return toContactSubmission(data.data);
}

// Same signature as dummy-data: markContactHandled(contact.id)
export async function markContactHandled(id: string): Promise<ContactSubmission> {
    const { data } = await apiClient.patch<ApiResponse<RawContact>>(`${ADMIN_BASE}/${id}/handled`);
    return toContactSubmission(data.data);
}

// For the public Contact page form submit.
export async function submitContact(input: CreateContactInput): Promise<void> {
    await apiClient.post<ApiResponse<RawContact>>(PUBLIC_BASE, input);
}