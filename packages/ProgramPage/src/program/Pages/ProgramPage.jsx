import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
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
import { ProgramLargeCard } from '../Components';
import { ProgramButton } from '../Components/ProgramCUDButton';
import { ProgramDetailsMediumContent, SubjectButton } from '../../../ProgramDetails/Components';
// import { ProgramMediumContent } from '../Components/ProgramMediumContent';
import { ProgramReadAsyncAction, ProgramListAsyncAction } from '../Queries';
import ProgramPageNavbar from './ProgramPageNavbar';
import { UserInputSearch } from '../Components/UserResults';
import { RoleInsertAsyncAction } from '../Queries/GuarrantInsertAsyncAction';

// ———————————————————————————————————————————————————
// Config
// ———————————————————————————————————————————————————
const GUARANTOR_ROLE_ID = '5f0c247e-931f-11ed-9b95-0242ac110002';

// ———————————————————————————————————————————————————
// Shared helper components
// ———————————————————————————————————————————————————
const IconBtn = ({ icon: Icon, tooltip, variant = 'outline-primary', ...props }) => (
  <OverlayTrigger placement="top" overlay={<Tooltip>{tooltip}</Tooltip>}>
    <Button variant={variant} size="sm" {...props}>
      <Icon />
    </Button>
  </OverlayTrigger>
);

const SectionCard = ({ title, icon: Icon, actions, children }) => (
  <Card className="shadow-sm border-0 mb-4">
    <Card.Header className="bg-white border-0 d-flex align-items-center justify-content-between">
      <div className="d-flex align-items-center gap-2 fw-semibold fs-5">
        <Icon className="text-primary" />
        {typeof title === 'string' ? <span>{title}</span> : title}
      </div>
      {actions && <ButtonToolbar className="gap-2">{actions}</ButtonToolbar>}
    </Card.Header>
    <Card.Body>{children}</Card.Body>
  </Card>
);

// ———————————————————————————————————————————————————
// Inline cards
// ———————————————————————————————————————————————————


const BasicInfoCard = ({ program }) => (
  <Card className="h-100 border-0 shadow-sm">
    <Card.Body className="pt-3">
      <ProgramMediumContent program={program} />
    </Card.Body>
  </Card>
);

const GuarantMediumContent = ({ program }) => {
  const guarantors = Array.isArray(program.guarantors) ? program.guarantors : program.guarantors ? [program.guarantors] : [];
  if (guarantors.length === 0) return <span className="text-muted small">Žádný garant</span>;
  return (
    <ul className="list-unstyled mb-0 small">
      {guarantors.flatMap((g) =>
        g.roles?.map((role) => (
          <li key={role.id} className="d-flex align-items-center gap-2">
            {role.user?.name} {role.user?.surname}
          </li>
        ))
      )}
    </ul>
  );
};

const TypeContent = ({ program }) => {
  if (!program.type?.name) return <span className="text-muted small">Neurčeno</span>;
  return (
    <ul className="list-unstyled mb-0 small">
      <li className="d-flex align-items-center gap-2">
        {program.type.name}
      </li>
    </ul>
  );
};

// ———————————————————————————————————————————————————
// Main page content
// ———————————————————————————————————————————————————
const ProgramPageContent = ({ program, isEditable }) => {
  const navigate = useNavigate();
  const [showGuarantor, setShowGuarantor] = useState(false);
  const [selectedGuarant, setSelectedGuarant] = useState(null);
  const { fetch: insertRole, loading: insertingRole } = useAsyncAction(RoleInsertAsyncAction, {}, { deferred: true });

  const confirmGuarantor = async () => {
    if (!selectedGuarant) return;
    await insertRole({ userId: selectedGuarant.id, groupId: program.groupId, roletypeId: GUARANTOR_ROLE_ID });
    setShowGuarantor(false);
  };

  const backBtn = (
    <Button variant="outline-secondary" size="sm" className="d-inline-flex align-items-center gap-2 mb-3" onClick={() => navigate('/programs')}>
      <i className="bi bi-arrow-left" /> <span>Zpět na seznam programů</span>
    </Button>
  );

  const headerActions = isEditable && (
    <>
      <ProgramButton operation="U" program={program}><IconBtn icon={() => <i className="bi bi-gear-fill" />} tooltip="Upravit" /></ProgramButton>
      <ProgramButton operation="C" program={{ name: 'Nový program', name_en: 'New Program', groupId: program.groupId }}>
        <IconBtn icon={() => <i className="bi bi-plus-circle" />} tooltip="Nový" />
      </ProgramButton>
      <ProgramButton operation="D" program={program}><IconBtn icon={() => <i className="bi bi-trash" />} variant="outline-danger" tooltip="Smazat" /></ProgramButton>
    </>
  );

  const subjectActions = isEditable && (
    <SubjectButton className="btn btn-sm btn-primary" operation="C" subject={{ name: 'Nový předmět', nameEn: 'New subject', programId: program.id, groupId: '119086b2-d24d-43fe-89f3-d5365e5ad7e7' }}>
      <i className="bi bi-plus-circle" />
    </SubjectButton>
  );

  return (
    <>
      {backBtn}
      <h4 className="fw-semibold mb-3">Detail programu — <span className="text-primary">{program.name}</span></h4>
      <SectionCard title="Základní informace" icon={() => <i className="bi bi-info-circle-fill" />} actions={headerActions}>
        <Row className="g-4">
          <Col>
            <div className="d-flex justify-content-between align-items-start mb-2">
              <h6 className="fw-semibold mb-0">
              <i className="bi bi-tag-fill text-primary" />
               Typ studjiního programu
              </h6>
            </div>
            <TypeContent program={program} />
            </Col>
            <Col>
            
            <div className="d-flex justify-content-between align-items-start mb-2">
              <h6 className="fw-semibold mb-0">
              <i className="bi bi-person-circle text-primary" />
              Garant
              </h6>
              {isEditable && <IconBtn icon={() => <i className="bi bi-person-plus" />} tooltip="Přidat garanta" onClick={() => setShowGuarantor(true)} />}
            </div>
            <GuarantMediumContent program={program} />
          </Col>
        </Row>
      </SectionCard>

      <SectionCard title="Předměty" icon={() => <i className="bi bi-journal-bookmark-fill" />} actions={subjectActions}>
        <ProgramDetailsMediumContent program={program} />
      </SectionCard>

      <Offcanvas show={showGuarantor} onHide={() => setShowGuarantor(false)} placement="end">
        <Offcanvas.Header closeButton className="bg-primary text-white" closeVariant="white"><Offcanvas.Title>Přidat garanta</Offcanvas.Title></Offcanvas.Header>
        <Offcanvas.Body>
          <UserInputSearch program={program} groupId={program.groupId} onSelect={setSelectedGuarant} />
          {selectedGuarant && (
            <div className="mt-3 d-flex align-items-center gap-3 p-3 border rounded">
              <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(selectedGuarant.name)}`} alt="avatar" className="rounded-circle" width={48} height={48} />
              <strong>{selectedGuarant.name}</strong>
            </div>
          )}
          <div className="d-flex justify-content-end gap-2 mt-4">
            <Button variant="secondary" onClick={() => setShowGuarantor(false)}>Zrušit</Button>
            <Button variant="primary" disabled={!selectedGuarant || insertingRole} onClick={confirmGuarantor}>
              {insertingRole && <Spinner animation="border" size="sm" className="me-2" />}Potvrdit
            </Button>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

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
            <Col key={p.id} lg={4} xl={3}><ProgramLargeCard program={p} /></Col>
          ))}
        </Row>
      </Container>
    );
  }
  return <ProgramPageContent program={entity} isEditable={isEditable} />;
};

// ---------------- Root page ----------------
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
