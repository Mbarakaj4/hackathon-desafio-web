import React, { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";

import {DateRangePicker} from "@nextui-org/react";
import {parseDate} from "@internationalized/date";


export const AddItinerario = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [dateRange, setDateRange] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    });

    const handleSelect = (ranges) => {
        setDateRange(ranges.selection);
        console.log("Selected Dates:", ranges.selection);
    };

    const handleActionPress = () => {
        console.log("Final Selected Dates:", dateRange);
        onOpenChange(false); // Closes the modal
    };

    return (
        <>
            <Button onPress={onOpen}>Open Modal</Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
              <ModalContent>
                <ModalHeader className="flex flex-col gap-1 bg-gray-200 p-4">Agregar Itinerario</ModalHeader>
                <ModalBody className="p-4">
                  <p className="mb-4"> 
                    Seleccione una fecha de inicio y una fecha de fin para agregar tu itinerario.
                  </p>
                  <DateRangePicker 
      label="Stay duration" 
      className="max-w-xs" 
    />

                </ModalBody>
                <ModalFooter className="p-4">
                  <Button color="error" auto flat onPress={() => onOpenChange(false)}>
                    Close
                  </Button>
                  <Button color="primary" auto onPress={handleActionPress}>
                    Save Dates
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
        </>
    );
};
