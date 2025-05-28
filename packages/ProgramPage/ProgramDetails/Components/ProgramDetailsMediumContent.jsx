import React from 'react';
import { Link } from 'react-router-dom';
import { ListGroup, Alert } from 'react-bootstrap';

/**
 * ProgramDetailsMediumContent
 * ----------------------------
 * Přehled předmětů patřících k danému programu v čistém Bootstrap stylu.
 * - Pokud program nemá předměty, zobrazí jemné upozornění.
 * - Každá položka je `ListGroup.Item` s ikonou knihy a odkazem na detail předmětu.
 */

const ProgramDetailsMediumContent = ({ program, children }) => {
  const { subjects = [] } = program || {};

  return (
    <div>
      {subjects.length === 0 ? (
        <Alert variant="light" className="border-0 py-2 mb-0">
          Žádné předměty nejsou přiřazeny k tomuto programu.
        </Alert>
      ) : (
        <ListGroup variant="flush">
          {subjects.map((subject) => (
            <ListGroup.Item
              key={subject.id}
              as={Link}
              to={`/subjects/${subject.id}`}
              action
              className="d-flex align-items-center gap-2 py-2 px-0"
            >
              <i className="bi bi-journal-text text-primary" />
              <span>{subject.name}</span>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
      {children}
    </div>
  );
};

export { ProgramDetailsMediumContent };
export default ProgramDetailsMediumContent;
