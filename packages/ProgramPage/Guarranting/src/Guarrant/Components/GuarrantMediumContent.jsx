// packages/ProgramPage/src/program/Components/GuarantorMediumContent.jsx

import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { UserInputSearch } from "./UserResults";
import { GuarrantMediumEditableContent } from "./GuarrantMediumEditableContent";
import { useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared";
import { RoleInsertAsyncAction } from "../Queries/GuarrantInsertAsyncAction";

const GUARANTOR_ROLE_ID = "5f0c247e-931f-11ed-9b95-0242ac110002";

export const GuarantMediumContent = ({ program, isEditable }) => {
    const [showConfirm, setShowConfirm] = useState(false);
    const [selectedGuarant, setSelectedGuarant] = useState(null);
    const { fetch } = useAsyncAction(RoleInsertAsyncAction, {});

    const guarantors = Array.isArray(program.guarantors)
        ? program.guarantors
        : program.guarantors
            ? [program.guarantors]
            : [];

    const handleAddGuarantor = (user) => {
        setSelectedGuarant(user);
        setShowConfirm(true);
    };

    const handleConfirm = () => {
        if (selectedGuarant) {
            fetch({
                userId: selectedGuarant.id,
                groupId: program.groupId,
                roletypeId: GUARANTOR_ROLE_ID,
            });
        }
        setShowConfirm(false);
        setSelectedGuarant(null);
    };

    const handleCancel = () => {
        setShowConfirm(false);
        setSelectedGuarant(null);
    };

    return (
        <div>
            <h5>Garanti programu</h5>
            {guarantors.length > 0 ? (
                guarantors.map((guarantor) => (
                    <div key={guarantor.id} className="guarantor-item">
                        {guarantor.roles && guarantor.roles.length > 0 ? (
                            guarantor.roles.map((role, idx) => (
                                <span key={idx}>
                                    {role.user?.name}
                                    {role.user?.surname ? ` ${role.user.surname}` : ""}
                                </span>
                            ))
                        ) : (
                            <span style={{ display: "inline-block", marginBottom: "1rem" }}>
  Žádní garanti programu nejsou přiřazeni.
</span>
                        )}
                    </div>
                ))
            ) : (
                <span style={{ display: "inline-block", marginBottom: "1rem" }}>
  Žádní garanti programu nejsou přiřazeni.
</span>
            )}
            {isEditable && (
                <>
                    <UserInputSearch
                        program={program}
                        groupId={program.groupId}
                        onSelect={handleAddGuarantor}
                    />
                    <Modal show={showConfirm} onHide={handleCancel}>
                        <Modal.Header closeButton>
                            <Modal.Title>Confirm Guarantor Addition</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <GuarrantMediumEditableContent guarant={selectedGuarant}>
                                <div>{selectedGuarant?.name}</div>
                            </GuarrantMediumEditableContent>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCancel}>
                                Cancel
                            </Button>
                            <Button variant="primary" onClick={handleConfirm}>
                                Confirm
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </>
            )}
        </div>
    );
};