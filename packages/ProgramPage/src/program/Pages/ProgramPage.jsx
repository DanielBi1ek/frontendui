import React, { useState } from 'react';
import { useParams } from 'react-router';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  ButtonToolbar,
  OverlayTrigger,
  Tooltip,
  Offcanvas,
  Spinner,
} from 'react-bootstrap';
import { ErrorHandler, LoadingSpinner } from '@hrbolek/uoisfrontend-shared';
import { useAsyncAction } from '@hrbolek/uoisfrontend-gql-shared';
import { ProgramLargeCard, ProgramMediumCard, ProgramLink } from '../Components';
import { ProgramDetailsMediumContent } from '../../../ProgramDetails/Components';
import { ProgramReadAsyncAction, ProgramListAsyncAction } from '../Queries';
import ProgramPageNavbar from './ProgramPageNavbar';
import { SubjectButtonCardCapsule } from '../Components/SubjectButtonDisplay';
import { GuarantMediumCard } from '../Components/GuarantorMediumCard';
import { UserInputSearch } from '../Components/UserResults';

// Constants
const GUARANTOR_ROLE_ID = '5f0c247e-931f-11ed-9b95-0242ac110002';

/*************************************************
 *  REUSABLE ICON BUTTON WITH TOOLTIP
 *************************************************/
const IconBtn = ({ icon: Icon, tooltip, variant = 'outline-primary', ...props }) => (
  <OverlayTrigger placement="top" overlay={<Tooltip>{tooltip}</Tooltip>}>
    <Button variant={variant} size="sm" {...props}>
      <Icon />
    </Button>
  </OverlayTrigger>
);

/*************************************************
 *  CARD WRAPPER COMPONENT
 *************************************************/
const SectionCard = ({ title, icon: Icon, actions, children }) => (
  <Card className="shadow-sm border-0 mb-4">
    <Card.Header className="bg-white border-0 d-flex align-items-center justify-content-between">
      <div className="d-flex align-items-center gap-2 fw-semibold fs-5">
        <Icon className="text-primary" />
        <span>{title}</span>
      </div>
      {actions && <ButtonToolbar className="gap-2">{actions}</ButtonToolbar>}
    </Card.Header>
    <Card.Body>{children}</Card.Body>
  </Card>
);

/*************************************************
 *  MAIN PAGE CONTENT (LOADED PROGRAM)
 *************************************************/
const ProgramPageContent = ({ program, isEditable }) => {
  /* ---------- Add guarantor off‑canvas ---------- */
  const [showGuarantor, setShowGuarantor] = useState(false);
  const [selectedGuarant, setSelectedGuarant] = useState(null);
  const { fetch: insertRole, loading: insertingRole } = useAsyncAction(null, {}, { deferred: true });

  const handleAddGuarantor = () => setShowGuarantor(true);
  const confirmGuarantor = async () => {
    if (!selectedGuarant) return;
    await insertRole({
      userId: selectedGuarant.id,
      groupId: program.groupId,
      roletypeId: GUARANTOR_ROLE_ID,
    });
    setShowGuarantor(false);
  };

  /* ---------- header action buttons ---------- */
  const headerActions = isEditable && (
    <>
      <IconBtn icon={() => <i className="bi bi-gear-fill" />} tooltip="Upravit program" />
      <IconBtn icon={() => <i className="bi bi-plus-circle" />} tooltip="Nový program" />
      <IconBtn icon={() => <i className="bi bi-trash" />} variant="outline-danger" tooltip="Smazat program" />
    </>
  );

  return (
    <>
      {/* ===== Přehled & garanti ===== */}
      <SectionCard
        title={<ProgramLink program={program} />}
        icon={() => <i className="bi bi-briefcase-fill" />}
        actions={headerActions}
      >
        <Row>
          <Col md={6} lg={5} xl={4} className="mb-3 mb-md-0">
            <ProgramMediumCard program={program} />
          </Col>
          <Col>
            <GuarantMediumCard program={program} onAdd={handleAddGuarantor} isEditable={isEditable} />
          </Col>
        </Row>
      </SectionCard>

      {/* ===== Předměty ===== */}
      <SectionCard title="Předměty" icon={() => <i className="bi bi-journal-bookmark-fill" />}>
        <SubjectButtonCardCapsule program={program} isEditable={isEditable}>
          <ProgramDetailsMediumContent program={program} />
        </SubjectButtonCardCapsule>
      </SectionCard>

      {/* ===== Off‑canvas: přidání garanta ===== */}
      <Offcanvas show={showGuarantor} onHide={() => setShowGuarantor(false)} placement="end">
        <Offcanvas.Header closeButton className="bg-primary text-white" closeVariant="white">
          <Offcanvas.Title>Přidat garanta</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <UserInputSearch program={program} groupId={program.groupId} onSelect={setSelectedGuarant} />
          {selectedGuarant && (
            <div className="mt-3 d-flex align-items-center gap-3 p-3 border rounded">
              <img
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(selectedGuarant.name)}`}
                alt="avatar"
                className="rounded-circle"
                width={48}
                height={48}
              />
              <strong>{selectedGuarant.name}</strong>
            </div>
          )}
          <div className="d-flex justify-content-end gap-2 mt-4">
            <Button variant="secondary" onClick={() => setShowGuarantor(false)}>
              Zrušit
            </Button>
            <Button variant="primary" disabled={!selectedGuarant || insertingRole} onClick={confirmGuarantor}>
              {insertingRole && <Spinner animation="border" size="sm" className="me-2" />}Potvrdit
            </Button>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

/*************************************************
 *  DATA WRAPPER (fetch program OR list)
 *************************************************/
const ProgramPageContentLazy = ({ programId, isEditable }) => {
  const { error, loading, entity } = useAsyncAction(
    programId ? ProgramReadAsyncAction : ProgramListAsyncAction,
    programId ? { id: programId } : {}
  );

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorHandler errors={error} />;

  if (!programId) {
    return (
      <Container fluid>
        <Row className="g-4">
          {entity?.result.map((p) => (
            <Col key={p.id} lg={4} xl={3}>
              <ProgramLargeCard program={p} />
            </Col>
          ))}
        </Row>
      </Container>
    );
  }

  return <ProgramPageContent program={entity} isEditable={isEditable} />;
};

/*************************************************
 *  ROOT PAGE
 *************************************************/
const ProgramPage = ({ isEditable = false, user }) => {
  const { id } = useParams();
  const programId = id ?? null;

  return (
    <ProgramPageNavbar user={user}>
      <Container fluid className="py-4 px-4 px-lg-5">
        <ProgramPageContentLazy programId={programId} isEditable={isEditable} />
      </Container>
    </ProgramPageNavbar>
  );
};

export { ProgramPage };
export default ProgramPage;
