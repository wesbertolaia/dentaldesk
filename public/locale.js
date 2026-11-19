(() => {
  const messages = {
    "Step {step} of 4": "Etapa {step} de 4",
    "Choose a patient profile": "Escolha um perfil de paciente",
    "Use the fictional patient below. No personal details are needed.": "Use o paciente fictício abaixo. Nenhum dado pessoal é necessário.",
    "Use Alex Morgan’s sample profile": "Usar o perfil fictício de Alex Morgan",
    "Continue to patient details": "Continuar para os dados do paciente",
    "Pending clinic review": "Aguardando análise da clínica",
    "Confirmed in demo": "Confirmado na demo",
    "Declined in demo": "Recusado na demo",
    "Patient requests": "Solicitações de pacientes",
    "Confirm request": "Confirmar solicitação",
    "Decline request": "Recusar solicitação",
    "Request status updated.": "Status da solicitação atualizado.",
    "No sample patient requests yet.": "Ainda não há solicitações de exemplo.",
    "Track last request": "Acompanhar última solicitação",
    "Request status": "Status da solicitação",
    "Refresh status": "Atualizar status",
    "This saves a sample request to the demo clinic workspace. The time is not reserved.": "Salva uma solicitação de exemplo no painel da clínica. O horário não fica reservado.",

    "Step {step} of 3": "Etapa {step} de 3",
    "You selected {service} for {slot}. No real appointment was booked.": "Você escolheu {service} para {slot}. Nenhuma consulta real foi agendada.",
    "Status for": "Status de",
    "Language": "Idioma",
    "Portfolio": "Portfólio",
    "Main navigation": "Navegação principal",
    "Case studies": "Estudos de caso",
    "Case study": "Estudo de caso",
    "Projects": "Projetos",
    "Source": "Código-fonte",
    "Source code": "Código-fonte",
    "Sample data and changes are stored in this browser.": "Os dados de exemplo e as alterações ficam salvos neste navegador.",
    "Back": "Voltar",
    "Date": "Data",
    "Time": "Horário",
    "Patient": "Paciente",
    "Consultation": "Consulta",
    "Cleaning": "Limpeza",
    "Changes could not be saved in this browser.": "Não foi possível salvar as alterações neste navegador.",
    "Open full site": "Abrir site completo",
    "DentalDesk dental practice scheduling demo.": "Demonstração de agendamento para clínica odontológica DentalDesk.",
    "DentalDesk | Clinic Schedule": "DentalDesk | Agenda da clínica",
    "Clinic workspace": "Painel da clínica",
    "Schedule": "Agenda",
    "Book a visit": "Agendar consulta",
    "Register patient": "Cadastrar paciente",
    "Patient booking preview": "Prévia do agendamento para pacientes",
    "View source on GitHub": "Ver código no GitHub",
    "Clinic schedule": "Agenda da clínica",
    "Manage patient appointments and visit status.": "Gerencie as consultas dos pacientes e o status do atendimento.",
    "Changes are stored in this browser": "As alterações ficam salvas neste navegador",
    "Sample records": "Registros de exemplo",
    "A patient appointment request prototype for DentalDesk.": "Protótipo de solicitação de atendimento do DentalDesk.",
    "Request a dental visit | DentalDesk": "Solicitar consulta odontológica | DentalDesk",
    "Portfolio prototype · Sample appointment times": "Protótipo de portfólio · Horários de exemplo",
    "Request a dental visit": "Solicite uma consulta odontológica",
    "Choose a visit type and see sample appointment times before entering any details.": "Escolha o atendimento e veja horários de exemplo antes de informar qualquer dado.",
    "What happens next?": "O que acontece depois?",
    "Review your visit and submit a sample request. In a live service, the clinic would confirm availability before the appointment is booked.": "Confira o atendimento e envie uma solicitação fictícia. Em um serviço real, a clínica confirmaria a disponibilidade antes de agendar.",
    "See dental visit times": "Veja os horários de consulta",
    "Dental check-up": "Avaliação odontológica",
    "Tuesday, 9:30 AM": "Terça-feira, 9h30",
    "Wednesday, 11:00 AM": "Quarta-feira, 11h",
    "Friday, 2:30 PM": "Sexta-feira, 14h30",
    "See appointment times": "Ver horários disponíveis",
    "Choose a visit time": "Escolher um horário",
    "What are you booking?": "Qual atendimento você procura?",
    "Visit type": "Tipo de atendimento",
    "Pick a sample time": "Escolha um horário de exemplo",
    "Appointment time": "Horário da consulta",
    "Review request": "Revisar solicitação",
    "Review your request": "Revise sua solicitação",
    "Visit": "Atendimento",
    "This prototype uses sample slots and sends nothing to a clinic.": "Este protótipo usa horários fictícios e não envia informações à clínica.",
    "Submit sample request": "Enviar solicitação fictícia",
    "Sample request complete": "Solicitação fictícia concluída",
    "Start again": "Recomeçar",
    "Scheduled": "Agendada",
    "Confirmed": "Confirmada",
    "Completed": "Concluída",
    "Cancelled": "Cancelada",
    "Follow-up": "Retorno",
    "Dental filling": "Restauração dentária",
    "Patient unavailable": "Paciente indisponível",
    "Enter a patient name.": "Informe o nome do paciente.",
    "Patient registered.": "Paciente cadastrado.",
    "This appointment slot is already booked.": "Já existe uma consulta neste horário.",
    "Appointment scheduled.": "Consulta agendada.",
    "This appointment slot has been booked again.": "Este horário já foi reservado novamente.",
    "Appointment status updated.": "Status da consulta atualizado.",
    "Practice overview": "Visão geral da clínica",
    "Today’s visits": "Consultas de hoje",
    "Confirmed today": "Confirmadas hoje",
    "Patients": "Pacientes",
    "Appointments": "Consultas",
    "Filter by date": "Filtrar por data",
    "Show all dates": "Mostrar todas as datas",
    "Appointment schedule": "Agenda de consultas",
    "Service": "Procedimento",
    "Status": "Status",
    "No appointments for this date.": "Nenhuma consulta nesta data.",
    "Register a patient": "Cadastrar um paciente",
    "Full name": "Nome completo",
    "e.g. Amelia Brooks": "ex.: Amelia Brooks",
    "Book an appointment": "Agendar uma consulta",
    "Book appointment": "Agendar consulta"
  };
  const key = 'wesley-portfolio-language';
  const supported = value => {
    const base = value?.toLowerCase().split('-')[0];
    if (base === 'pt') return 'pt-BR';
    if (base === 'en') return 'en';
  };
  let saved;
  try { saved = supported(localStorage.getItem(key)); } catch { /* Storage can be disabled. */ }
  const requested = supported(new URLSearchParams(location.search).get('lang'));
  const language = requested || saved || (navigator.languages || []).map(supported).find(Boolean)
    || supported(navigator.language) || 'en';
  if (requested) {
    try { localStorage.setItem(key, language); } catch { /* The URL still keeps the preference. */ }
  }
  document.documentElement.lang = language;

  const t = text => language === 'pt-BR' && Object.hasOwn(messages, text) ? messages[text] : text;
  const date = value => language === 'pt-BR' && /^\d{4}-\d{2}-\d{2}$/.test(value)
    ? value.split('-').reverse().join('/') : value;

  function url(href) {
    const link = new URL(href, location.href);
    if (link.origin === location.origin && ['http:', 'https:'].includes(link.protocol)) {
      if (language === 'pt-BR' || requested) link.searchParams.set('lang', language);
    }
    return link.href;
  }

  function textNode(text) {
    const plain = text.trim();
    return plain ? text.replace(plain, t(plain)) : text;
  }

  function apply(root) {
    if (language === 'pt-BR') {
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
        acceptNode: node => node.parentElement?.closest('script, style')
          ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT,
      });
      while (walker.nextNode()) {
        const node = walker.currentNode;
        const translated = textNode(node.data);
        if (node.data === translated) continue;
        if (node.parentElement?.matches('option:not([value])')) node.parentElement.value = node.data.trim();
        node.data = translated;
      }
      for (const item of root.querySelectorAll('[aria-label], [title], [placeholder], meta[name="description"]')) {
        for (const attribute of ['aria-label', 'title', 'placeholder', 'content']) {
          if (item.hasAttribute(attribute)) item.setAttribute(attribute, t(item.getAttribute(attribute)));
        }
      }
    }
    for (const link of root.querySelectorAll('a[href]')) {
      const href = link.getAttribute('href');
      if (href && !href.startsWith('#')) link.href = url(href);
    }
  }

  // Translate literal template labels before Angular compiles the template.
  function template(markup) {
    if (language !== 'pt-BR') return markup;
    return markup.replace(/>([^<>]+)(?=<)/g, (_, text) => '>' + textNode(text))
      .replace(/(aria-label|placeholder|title)="([^"]+)"/g, (_, key, value) => key + '="' + t(value) + '"');
  }

  function initialize() {
    apply(document);
    const mount = document.querySelector('[data-language-menu]');
    if (!mount || window.self !== window.top) return;
    const select = document.createElement('select');
    select.className = 'language-picker';
    select.setAttribute('aria-label', t('Language'));
    select.add(new Option('EN', 'en'));
    select.add(new Option('PT-BR', 'pt-BR'));
    select.value = language;
    select.addEventListener('change', () => {
      const next = new URL(location.href);
      next.searchParams.set('lang', select.value);
      const project = document.querySelector('.project-card[aria-pressed="true"]')?.dataset.project;
      if (project) next.searchParams.set('demo', project);
      try { localStorage.setItem(key, select.value); } catch { /* The URL carries the choice. */ }
      location.assign(next);
    });
    mount.replaceChildren(select);
  }

  window.siteLocale = { language, t, date, url, apply, template };
  document.addEventListener('DOMContentLoaded', initialize, { once: true });
})();
