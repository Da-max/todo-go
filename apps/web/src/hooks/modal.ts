import { type MaybeRef, toRef } from "vue";
import { whenever } from "@vueuse/core";

export type UseModalOptions = {
    initialValue: MaybeRef<boolean>;
    onClose?: () => void;
};

export const useModal = (
    options: UseModalOptions = {
        initialValue: false,
    },
) => {
    const modalOpen = toRef(options.initialValue);

    const modalClose = () => {
        modalOpen.value = false;
    };

    if (options.onClose) {
        whenever(() => !modalOpen.value, options.onClose);
    }

    return {
        modalOpen,
        modalClose,
    };
};
