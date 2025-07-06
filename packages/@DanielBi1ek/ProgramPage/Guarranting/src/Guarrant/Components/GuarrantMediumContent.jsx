// packages/ProgramPage/Program/program/Components/GuarantorMediumContent.jsx

import React, {useEffect, useState} from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {UserInputSearch} from "./UserResults";
import {GuarrantMediumEditableContent} from "./GuarrantMediumEditableContent";
import {useAsyncAction} from "@hrbolek/uoisfrontend-gql-shared";
import {RoleInsertAsyncAction} from "../Queries";
import {GuarrantButton} from "./GuarrantCUDButton";
import {Check, PersonFill, Trash} from "react-bootstrap-icons";

const GUARANTOR_ROLE_ID = "5f0c247e-931f-11ed-9b95-0242ac110002";


export const GuarantMediumContent = ({ program, isEditable }) => {
    const [selectedGuarant, setSelectedGuarant] = useState(null);
    const [guarantors, setGuarantors] = useState([]);

    useEffect(() => {
        setGuarantors(
            Array.isArray(program.guarantors)
                ? program.guarantors
                : program.guarantors
                    ? [program.guarantors]
                    : []
        );
    }, [program.guarantors]);


    const handleGuarantorAdded = (result) => {
        if (selectedGuarant) {
            setGuarantors(prev => [
                ...prev,
                {
                    id: selectedGuarant.id,
                    roles: [
                        {
                            user: {
                                name: selectedGuarant.name || selectedGuarant.fullname?.split(" ")[0] || "",
                                surname: selectedGuarant.surname || selectedGuarant.fullname?.split(" ").slice(1).join(" ") || "",
                            }
                        }
                    ]
                }
            ]);
        }
        setSelectedGuarant(null);
    };


    const handleGuarantorDeleted = (guarant) => {
        setGuarantors(prev =>
            prev.filter(g =>
                !g.roles.some(role => role.id === guarant.id)
            )
        );
    };

    return (
        <div>
            <h5>Garanti programu:</h5>
            {guarantors.length > 0 ? (
                guarantors.map((guarantor) => (
                    <div key={guarantor.id} className="guarantor-item"
                         style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        {guarantor.roles && guarantor.roles.length > 0 ? (
                            guarantor.roles.map((role, idx) => (
                                <span key={idx} style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                                    <PersonFill color="#0d6efd" style={{ marginRight: "0.25rem" }} />
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
                                            onDone={() => handleGuarantorDeleted(role)}
                                            style={{
                                                background: "transparent",
                                                color: "#dc3545",
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
                        ) : null}
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
                        onSelect={setSelectedGuarant}
                    />
                    {selectedGuarant && (
                        <GuarrantButton
                            operation="C"
                            guarant={{
                                userId: selectedGuarant.id,
                                name: selectedGuarant.name || selectedGuarant.fullname?.split(" ")[0] || "",
                                surname: selectedGuarant.surname || selectedGuarant.fullname?.split(" ").slice(1).join(" ") || "",
                                groupId: program.groupId,
                                roletypeId: GUARANTOR_ROLE_ID,
                            }}
                            onDone={handleGuarantorAdded}
                            className="btn btn-primary"
                            style={{ marginTop: 8 }}
                        >
                            Přidat garanta
                            <Check style={{ marginLeft: "0.5rem" }} />
                        </GuarrantButton>
                    )}
                </>
            )}
        </div>
    );
};