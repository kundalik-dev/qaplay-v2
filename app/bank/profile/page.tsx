"use client";

import { useState } from "react";
import { User, Lock, ShieldCheck, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { useBankAppStore, useCurrentUser } from "../store/useBankAppStore";
import { isValidEmail, isValidPhone } from "../lib/utils";

export default function ProfilePage() {
  const { currentUsername, updateProfile, changePassword, resetUserData, logout } = useBankAppStore();
  const currentUser = useCurrentUser();
  const profile = currentUser?.profile;

  // Personal info state
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState(profile?.firstName ?? "");
  const [lastName, setLastName] = useState(profile?.lastName ?? "");
  const [email, setEmail] = useState(profile?.email ?? "");
  const [phone, setPhone] = useState(profile?.phone ?? "");
  const [address, setAddress] = useState(profile?.address ?? "");
  const [profileError, setProfileError] = useState<string | null>(null);
  const [profileSuccess, setProfileSuccess] = useState(false);

  // Password state
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [pwError, setPwError] = useState<string | null>(null);
  const [pwSuccess, setPwSuccess] = useState(false);

  // 2FA toggle
  const [twoFaEnabled, setTwoFaEnabled] = useState(false);

  // Reset data dialog
  const [showResetDialog, setShowResetDialog] = useState(false);

  const handleEditToggle = () => {
    if (isEditing) {
      // Cancel — restore values
      setFirstName(profile?.firstName ?? "");
      setLastName(profile?.lastName ?? "");
      setEmail(profile?.email ?? "");
      setPhone(profile?.phone ?? "");
      setAddress(profile?.address ?? "");
      setProfileError(null);
    }
    setIsEditing(!isEditing);
    setProfileSuccess(false);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setProfileError(null);
    if (!email.trim() || !isValidEmail(email)) { setProfileError("Please enter a valid email address."); return; }
    if (phone && !isValidPhone(phone)) { setProfileError("Phone must be in format (XXX) XXX-XXXX or +1XXXXXXXXXX."); return; }
    updateProfile(currentUsername!, { firstName, lastName, email, phone, address });
    setIsEditing(false);
    setProfileSuccess(true);
    setTimeout(() => setProfileSuccess(false), 3000);
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPwError(null);
    setPwSuccess(false);
    const err = changePassword(currentUsername!, currentPw, newPw, confirmPw);
    if (err) { setPwError(err); }
    else {
      setPwSuccess(true);
      setCurrentPw(""); setNewPw(""); setConfirmPw("");
      setTimeout(() => setPwSuccess(false), 3000);
    }
  };

  const handleResetData = () => {
    resetUserData(currentUsername!);
    setShowResetDialog(false);
  };

  return (
    <div data-testid="profile-page" data-section="profile" className="max-w-2xl">
      <h1 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white" data-testid="profile-page-title">
        Profile & Settings
      </h1>

      {/* ── Personal Information ─────────────────────────────────── */}
      <section
        className="mb-6 rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800"
        data-testid="personal-info-section"
        aria-label="Personal information"
      >
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-slate-500" aria-hidden="true" />
            <h2 className="font-semibold text-slate-900 dark:text-white">Personal Information</h2>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleEditToggle}
            data-testid="edit-profile-btn"
          >
            {isEditing ? "Cancel" : "Edit"}
          </Button>
        </div>

        {profileSuccess && (
          <div className="mb-4 rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700" role="status" data-testid="profile-save-success">
            Profile updated successfully.
          </div>
        )}
        {profileError && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700" role="alert" data-testid="profile-error">
            {profileError}
          </div>
        )}

        {/*
         * Beginner: data-testid on read-only display fields
         * Medium: form fields only visible in edit mode (toggle)
         * Hard: phone input uses span label (no for/id)
         */}
        {!isEditing ? (
          <div className="space-y-3 text-sm" data-testid="profile-display">
            {[
              { label: "Username", value: currentUsername, testid: "profile-username" },
              { label: "First Name", value: profile?.firstName, testid: "profile-first-name" },
              { label: "Last Name", value: profile?.lastName, testid: "profile-last-name" },
              { label: "Email", value: profile?.email, testid: "profile-email" },
              { label: "Phone", value: profile?.phone, testid: "profile-phone" },
              { label: "Address", value: profile?.address, testid: "profile-address" },
            ].map(({ label, value, testid }) => (
              <div key={label} className="flex gap-4">
                <span className="w-28 shrink-0 text-slate-500">{label}</span>
                <span className="font-medium text-slate-900 dark:text-white" data-testid={testid}>
                  {value ?? "—"}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <form onSubmit={handleSaveProfile} data-testid="profile-edit-form" noValidate>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="profile-first-name-input" className="mb-1 block text-xs font-medium text-slate-600">First Name</Label>
                <Input id="profile-first-name-input" value={firstName} onChange={(e) => setFirstName(e.target.value)} data-testid="profile-first-name-input" />
              </div>
              <div>
                <Label htmlFor="profile-last-name-input" className="mb-1 block text-xs font-medium text-slate-600">Last Name</Label>
                <Input id="profile-last-name-input" value={lastName} onChange={(e) => setLastName(e.target.value)} data-testid="profile-last-name-input" />
              </div>
            </div>
            <div className="mt-3">
              <Label htmlFor="profile-email-input" className="mb-1 block text-xs font-medium text-slate-600">Email</Label>
              <Input id="profile-email-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} data-testid="profile-email-input" />
            </div>
            {/*
             * Hard locator: phone input — span label, no for/id linkage
             * XPath: //span[normalize-space()="Phone"]/following-sibling::div//input
             * CSS: [data-testid="profile-edit-form"] input[name="phone_field"]
             */}
            <div className="mt-3">
              <span className="mb-1 block text-xs font-medium text-slate-600">Phone</span>
              <div>
                <Input name="phone_field" type="tel" placeholder="(415) 555-0101" value={phone} onChange={(e) => setPhone(e.target.value)} data-testid="profile-phone-input" />
              </div>
              <p className="mt-0.5 text-xs text-slate-400">Format: (XXX) XXX-XXXX or +1XXXXXXXXXX</p>
            </div>
            <div className="mt-3">
              <Label htmlFor="profile-address-input" className="mb-1 block text-xs font-medium text-slate-600">Address</Label>
              <Input id="profile-address-input" value={address} onChange={(e) => setAddress(e.target.value)} data-testid="profile-address-input" />
            </div>
            <div className="mt-4 flex gap-2">
              <Button type="submit" size="sm" data-testid="save-profile-btn" className="bg-violet-600 hover:bg-violet-700">Save Changes</Button>
              <Button type="button" variant="outline" size="sm" onClick={handleEditToggle} data-testid="cancel-edit-profile-btn">Cancel</Button>
            </div>
          </form>
        )}
      </section>

      <Separator className="my-6" />

      {/* ── Change Password ──────────────────────────────────────── */}
      <section
        className="mb-6 rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800"
        data-testid="change-password-section"
        aria-label="Change password"
      >
        <div className="mb-4 flex items-center gap-2">
          <Lock className="h-4 w-4 text-slate-500" />
          <h2 className="font-semibold text-slate-900 dark:text-white">Change Password</h2>
        </div>

        {pwSuccess && (
          <div className="mb-4 rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700" role="status" data-testid="password-change-success">
            Password changed successfully.
          </div>
        )}
        {pwError && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700" role="alert" data-testid="password-change-error">
            {pwError}
          </div>
        )}

        <form onSubmit={handleChangePassword} data-testid="change-password-form" className="space-y-3" noValidate>
          <div>
            <Label htmlFor="current-password" className="mb-1 block text-xs font-medium text-slate-600">Current Password</Label>
            <Input id="current-password" type="password" value={currentPw} onChange={(e) => setCurrentPw(e.target.value)} data-testid="current-password-input" autoComplete="current-password" />
          </div>
          <div>
            <Label htmlFor="new-password" className="mb-1 block text-xs font-medium text-slate-600">New Password</Label>
            <Input id="new-password" type="password" value={newPw} onChange={(e) => setNewPw(e.target.value)} data-testid="new-password-input" autoComplete="new-password" />
          </div>
          <div>
            <Label htmlFor="confirm-new-password" className="mb-1 block text-xs font-medium text-slate-600">Confirm New Password</Label>
            <Input id="confirm-new-password" type="password" value={confirmPw} onChange={(e) => setConfirmPw(e.target.value)} data-testid="confirm-password-input" autoComplete="new-password" />
          </div>
          <Button type="submit" size="sm" data-testid="save-password-btn" className="bg-violet-600 hover:bg-violet-700">Change Password</Button>
        </form>
      </section>

      <Separator className="my-6" />

      {/* ── Security / 2FA ───────────────────────────────────────── */}
      <section
        className="mb-6 rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800"
        data-testid="security-section"
        aria-label="Security settings"
      >
        <div className="mb-4 flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-slate-500" />
          <h2 className="font-semibold text-slate-900 dark:text-white">Security</h2>
        </div>
        {/*
         * Challenge locator: 2FA toggle — button with aria-pressed, no data-testid
         * Practice: page.getByRole('button', { name: /Two-Factor Authentication/ })
         * XPath: //section[@data-testid="security-section"]//button[@role="switch"]
         */}
        <div
          className="flex items-center justify-between"
          data-testid="two-fa-row"
        >
          <div>
            <p className="text-sm font-medium text-slate-900 dark:text-white">Two-Factor Authentication</p>
            <p className="text-xs text-slate-500">UI demonstration only — no real 2FA implemented</p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={twoFaEnabled}
            aria-label={twoFaEnabled ? "Disable Two-Factor Authentication" : "Enable Two-Factor Authentication"}
            onClick={() => setTwoFaEnabled(!twoFaEnabled)}
            data-testid="two-fa-toggle"
            className={[
              "relative h-6 w-11 rounded-full transition-colors",
              twoFaEnabled ? "bg-violet-600" : "bg-slate-300",
            ].join(" ")}
          >
            <span
              className={[
                "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform",
                twoFaEnabled ? "translate-x-5" : "translate-x-0.5",
              ].join(" ")}
            />
          </button>
        </div>
      </section>

      <Separator className="my-6" />

      {/* ── Danger Zone ──────────────────────────────────────────── */}
      <section
        className="rounded-xl border border-red-200 bg-red-50/40 p-6 dark:border-red-900 dark:bg-red-900/10"
        data-testid="danger-zone-section"
        aria-label="Danger zone"
      >
        <div className="mb-3 flex items-center gap-2">
          <Trash2 className="h-4 w-4 text-red-600" />
          <h2 className="font-semibold text-red-700 dark:text-red-400">Danger Zone</h2>
        </div>
        <p className="mb-4 text-sm text-red-600 dark:text-red-400">
          Resetting your data will restore all accounts, transactions, payees, billers, and notifications to their default seed values. This cannot be undone.
        </p>
        <Button
          type="button"
          variant="destructive"
          size="sm"
          onClick={() => setShowResetDialog(true)}
          data-testid="reset-data-btn"
        >
          Reset All My Data
        </Button>
      </section>

      {/* Reset confirmation dialog */}
      <Dialog open={showResetDialog} onOpenChange={setShowResetDialog}>
        <DialogContent
          data-testid="reset-data-dialog"
          role="dialog"
          aria-modal="true"
          aria-labelledby="reset-dialog-title"
        >
          <DialogHeader>
            <DialogTitle id="reset-dialog-title">Reset all data?</DialogTitle>
            <DialogDescription>
              All your accounts, transactions, payees, billers, and notifications will be restored to seed defaults. This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            {/*
             * Challenge locator: Cancel inside dialog — no data-testid, role scoped
             * Practice: page.getByRole('dialog', { name: 'Reset all data?' }).getByRole('button', { name: 'Cancel' })
             */}
            <Button variant="outline" onClick={() => setShowResetDialog(false)}>
              Cancel
            </Button>
            {/*
             * Challenge: Confirm delete — aria-label contains "Reset", no data-testid
             * XPath: //*[@role="dialog" and .//h2[normalize-space()="Reset all data?"]]//button[contains(@aria-label,"Reset")]
             */}
            <Button
              variant="destructive"
              onClick={handleResetData}
              aria-label="Confirm reset all data"
              data-testid="confirm-reset-btn"
            >
              Yes, Reset Everything
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
