import { Modal } from '@/components/modal';

export default function PhotoModal({
    params: { id: photoId },
}: {
    params: { id: string };
}) {
    return (
        <Modal>
            {photoId}
        </Modal>
    );
}