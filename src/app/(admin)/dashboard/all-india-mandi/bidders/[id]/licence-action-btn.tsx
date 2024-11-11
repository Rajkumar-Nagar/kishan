"use client"
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { licenceActions } from '@/actions'
import { useToast } from '@/hooks/use-toast'

const LicenceActionButtons = ({ id }: { id: string }) => {
    const [rejectLoading, setRejectLoading] = useState(false);
    const [acceptLoading, setAcceptLoading] = useState(false);
    const { toast } = useToast()

    const handleAccept = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setAcceptLoading(true);
        const error = await licenceActions.approveLicence(id);
        setAcceptLoading(false);
        if (error) {
            console.error(error);
            toast({
                title: 'Error',
                description: 'Something went wrong',
                variant: 'destructive',
                duration: 2000
            })
        }
    }

    const handleReject = async (e: React.MouseEvent<HTMLButtonElement>) => {
        setRejectLoading(true);
        const error = await licenceActions.rejectLicence(id);
        setRejectLoading(false);
        if (error) {
            console.error(error);
            toast({
                title: 'Error',
                description: 'Something went wrong',
                variant: 'destructive',
                duration: 2000
            })
        }
    }

    return (
        <>
            <Button
                variant={'destructive'}
                disabled={rejectLoading || acceptLoading}
                onClick={handleReject}
            >
                {rejectLoading ? 'Rejecting...' : 'Reject'}
            </Button>

            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button>Approve</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will approve the licence.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleAccept} disabled={acceptLoading || rejectLoading}>
                            {acceptLoading ? 'Approving...' : 'Approve'}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}

export default LicenceActionButtons
