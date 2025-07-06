// packages/ProgramPage/Program/program/Components/GuarantorMediumContent.jsx

import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { UserInputSearch } from "./UserResults";
import { GuarrantMediumEditableContent } from "./GuarrantMediumEditableContent";
import { useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared";
import { RoleInsertAsyncAction } from "../Queries";
import {GuarrantButton} from "./GuarrantCUDButton";
import { Trash } from "react-bootstrap-icons";
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



    const handleConfirm = async () => {
        if (!selectedGuarant) return;
        // Call the insert mutation
        await fetch({
            userId: selectedGuarant.id,
            groupId: program.groupId,
            roletypeId: GUARANTOR_ROLE_ID,
        });
        setShowConfirm(false);
        setSelectedGuarant(null);
        // Optionally, trigger a refresh of the parent data here
    };

    const handleCancel = () => {
        setShowConfirm(false);
        setSelectedGuarant(null);
    };

    return (
        <div>
            <h5>Garanti programu:</h5>
            {guarantors.map((guarantor) => (
                <div key={guarantor.id} className="guarantor-item" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    {guarantor.roles && guarantor.roles.length > 0 ? (
                        guarantor.roles.map((role, idx) => (
                            console.log("Delete mapping:", {
                                id: role.id,
                                lastchange: role.lastchange,
                                name: role.user?.name,
                                surname: role.user?.surname
                            }),


                            <span key={idx} style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                    {role.user?.name}
                                {role.user?.surname ? ` ${role.user.surname}` : ""}
                                {isEditable && (
                                    <GuarrantButton
                                        operation="D"
                                        guarant={{
                                            id: role.id,
                                            lastchange: role.lastchange,
                                            name: role.user?.name,
                                            surname: role.user?.surname
                                        }}
                                        onDone={handleConfirm}
                                        style={{
                                            background: "transparent",
                                            color: "#dc3545", // red
                                            border: "none",
                                            borderRadius: "50%",
                                            width: "28px",
                                            height: "28px",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            cursor: "pointer",
                                            fontSize: "1.2rem",
                                            transition: "background 0.2s",
                                            padding: 0,
                                        }}
                                        className="guarant-delete-btn"
                                        title="Remove guarantor"
                                    >
                                        <Trash />
                                    </GuarrantButton>
                                )}
                </span>
                        ))
                    ) : (
                        <span style={{ display: "inline-block", marginBottom: "1rem" }}>
                Žádní garanti programu nejsou přiřazeni.
            </span>
                    )}
                </div>
            ))}
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
                            <GuarrantMediumEditableContent guarant={selectedGuarant} operation="C">
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