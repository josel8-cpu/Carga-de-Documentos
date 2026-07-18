// ============================================================
// C-MOVIL · Etapa de Decisiones · Firmas de Autorización
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------------------------------------------------
     1. Catálogo de comité
  --------------------------------------------------------- */
  const TITULAR_PRESIDENTE = 'ING. JUAN MORENO DE LA HIGUERA';
  const TITULAR_SECRETARIA = 'LIC. MELISA CRUZ CRUZ';

  const SUPLENTES_PRESIDENTE = [
    'LIC. ELDA AZUCENA LOPEZ MATIAS',
    'LIC. ARNOLDO MONZON ALTUZAR',
    'LIC. JAIR ALEXANDER JIMENEZ LOPEZ',
    'LIC. LUIS ALBERTO ESTRADA CAMACHO'
  ];

  const SUPLENTES_SECRETARIA = [
    'LIC. ELDA AZUCENA LOPEZ MATIAS',
    'LIC. ARNOLDO MONZON ALTUZAR',
    'LIC. JAIR ALEXANDER JIMENEZ LOPEZ',
    'LIC. LUIS ALBERTO ESTRADA CAMACHO'
  ];

  function poblarNombres(selectNombre, tipo, nombreTitular, listaSuplentes) {
    selectNombre.innerHTML = '';

    if (tipo === 'titular') {
      const opt = document.createElement('option');
      opt.value = nombreTitular;
      opt.textContent = nombreTitular;
      selectNombre.appendChild(opt);
      selectNombre.disabled = false;
    } else {
      listaSuplentes.forEach((nombre, idx) => {
        const opt = document.createElement('option');
        opt.value = `${nombre}__${idx + 1}`;
        opt.textContent = `${nombre}`;
        selectNombre.appendChild(opt);
      });
      selectNombre.disabled = false;
    }
  }

  const presidenteTipo = document.getElementById('presidenteTipo');
  const presidenteNombre = document.getElementById('presidenteNombre');

  if (presidenteTipo && presidenteNombre) {
    poblarNombres(presidenteNombre, presidenteTipo.value, TITULAR_PRESIDENTE, SUPLENTES_PRESIDENTE);
    presidenteTipo.addEventListener('change', () => {
      poblarNombres(presidenteNombre, presidenteTipo.value, TITULAR_PRESIDENTE, SUPLENTES_PRESIDENTE);
    });
  }

  const secretariaTipo = document.getElementById('secretariaTipo');
  const secretariaNombre = document.getElementById('secretariaNombre');

  if (secretariaTipo && secretariaNombre) {
    poblarNombres(secretariaNombre, secretariaTipo.value, TITULAR_SECRETARIA, SUPLENTES_SECRETARIA);
    secretariaTipo.addEventListener('change', () => {
      poblarNombres(secretariaNombre, secretariaTipo.value, TITULAR_SECRETARIA, SUPLENTES_SECRETARIA);
    });
  }

  const chkFirmaEspecial = document.getElementById('requiereFirmaEspecial');
  const chkFirmaExtraordinaria = document.getElementById('requiereFirmaExtraordinaria');
  const wrapperFirmaEspecial = document.getElementById('wrapperFirmaEspecial');
  const wrapperFirmaExtraordinaria = document.getElementById('wrapperFirmaExtraordinaria');
  const wrapperFirmaVacio = document.getElementById('wrapperFirmaVacio');
  const firmaExtraordinaria = document.getElementById('firmaExtraordinaria');

  function actualizarVisibilidadFirmas() {
    const mostrarEspecial = chkFirmaEspecial ? chkFirmaEspecial.checked : false;
    const mostrarExtraordinaria = chkFirmaExtraordinaria ? chkFirmaExtraordinaria.checked : false;

    if (wrapperFirmaEspecial) wrapperFirmaEspecial.style.display = mostrarEspecial ? 'flex' : 'none';
    if (wrapperFirmaExtraordinaria) wrapperFirmaExtraordinaria.style.display = mostrarExtraordinaria ? 'flex' : 'none';

    if (wrapperFirmaVacio) {
      wrapperFirmaVacio.style.display = (mostrarEspecial || mostrarExtraordinaria) ? 'block' : 'none';
    }

    if (!mostrarExtraordinaria && firmaExtraordinaria) {
      firmaExtraordinaria.value = '';
    }
  }

  if (chkFirmaEspecial) {
    chkFirmaEspecial.addEventListener('change', () => {
      actualizarVisibilidadFirmas();
      marcarUltimaModificacion();
    });
  }

  if (chkFirmaExtraordinaria) {
    chkFirmaExtraordinaria.addEventListener('change', () => {
      actualizarVisibilidadFirmas();
      marcarUltimaModificacion();
    });
  }

  /* ---------------------------------------------------------
     2. Fechas automáticas
  --------------------------------------------------------- */
  const autorizacionSelect = document.getElementById('autorizacion');
  const fechaAprobacionInput = document.getElementById('fechaAprobacion');
  const fechaResolucionInput = document.getElementById('fechaResolucion');
  const ultimaModificacionInput = document.getElementById('ultimaModificacion');

  function formatearFecha(date) {
    const opciones = {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    };
    return date.toLocaleString('es-MX', opciones);
  }

  function marcarUltimaModificacion() {
    if (ultimaModificacionInput) {
      ultimaModificacionInput.value = formatearFecha(new Date());
    }
  }

  marcarUltimaModificacion();

  /* ---------------------------------------------------------
     2.1 Plantillas de resoluciones predefinidas
  --------------------------------------------------------- */
  const PLANTILLAS_RESOLUCION = {
    autorizado: [
      { titulo: "1. Previo a solicitud, integrar permiso a nombre del cliente", texto: "1.- Previo a la solicitud del contrato, se deberá integrar el permiso a nombre de la cliente." },
      { titulo: "2. Validar información y declinar por inconsistencias", texto: "2.- Durante el desembolso, se deberá validar la información proporcionada por el cliente y, de encontrarse alguna inconsistencia, se podrá declinar el presente crédito." },
      { titulo: "3. Puntual seguimiento al caso hasta recuperación al 100%", texto: "3.- Puntual seguimiento al caso por parte del ejecutivo, gerente y D.C. hasta la recuperación del crédito al 100%." },
      { titulo: "4. No liberar factura de unidad en garantía hasta liquidación", texto: "4.- No liberar la factura de la unidad en garantía hasta la liquidación del presente crédito al 100%." },
      { titulo: "5. Plan de pago semanal por importes vencidos en buró", texto: "5.- Se autoriza plan de pago semanal; esto debido a los importes vencidos que el cliente reporta en su buró de crédito." },
      { titulo: "6. Autorización por $0.00 descontando cuotas pendientes", texto: "6.- El presente caso se autoriza por un monto de $0.00. De este monto, se deberán descontar las cuotas pendientes por cubrir para la liquidación del crédito N.º XXXXXX y la diferencia desembolsarse a la cuenta del cliente." },
      { titulo: "7. Autorización por argumentos de Gerente (dd/mm/aa)", texto: "7.- Para la autorización del presente crédito, se toman en cuenta los argumentos expuestos por la gerente en su correo de fecha dd/mm/aa, asumiendo cualquier responsabilidad en caso de suscitarse problemas en la recuperación y localización del cliente." },
      { titulo: "8. Coincidencia SAFI en nombre de cliente (sin riesgo)", texto: "8.- Con respecto al reporte de coincidencia en SAFI emitido por el área de análisis de crédito, al revisarlo se detecta que la coincidencia radica en el nombre del cliente, mas no en su RFC y fecha de nacimiento, no detectando al momento riesgo alguno." },
      { titulo: "9. Coincidencia SAFI en nombre de cliente, obligaciones ISR/IVA", texto: "9.- Con respecto al reporte de coincidencia en SAFI emitido por el área de análisis de crédito, al revisarlo se detecta que la coincidencia radica en el nombre de la cliente, mas no se pudo corroborar por su RFC y CURP ya que el reporte no emite información alguna, no detectándose al momento de la revisión riesgo alguno. Su constancia de situación fiscal reporta algunas obligaciones tales como declaración anual de ISR, pago de IVA, declaración de proveedores de IVA y pago provisional mensual de ISR por actividades empresariales." },
      { titulo: "10. Pagaré de Distribuidor por $0.00 como garantía alterna", texto: "10.- Como mitigante de riesgo para el presente crédito, se constituirá como garantía alterna la firma de un pagaré por parte del Distribuidor XXXXXX por la cantidad de $0.00; esto previo a la formalización del contrato, puntualizándose que en caso de incumplimiento de pago del cliente, así como de problemas para la adjudicación de la unidad, Asefimex podrá ejecutar como medio de pago del presente crédito el referido pagaré suscrito por el distribuidor. Esto se realizará de manera inmediata y no implicará que se tengan que agotar los procedimientos de cobranza y adjudicación de la unidad en garantía." },
      { titulo: "11. Participación de Distribuidor y sucursal hasta recuperación", texto: "11.- Para el seguimiento puntual del presente crédito, se establece como condición la participación conjunta y activa del Distribuidor y la sucursal de Asefimex hasta la recuperación del crédito al 100%." },
      { titulo: "12. Integrar reporte fotográfico (actividad/domicilio)", texto: "12.- Previo a la solicitud del contrato, se deberá integrar el reporte fotográfico debidamente requisitado con fotos del domicilio y de la actividad económica, ya que se presenta sin fotografías." }
    ],
    observado: [
      { titulo: "1. Integrar aval del núcleo familiar (papá/mamá)", texto: "1.- Deberá integrarse a una persona del núcleo familiar (papá o mamá) como aval y que cumpla acorde a la política, para con ello poder emitir un dictamen (dd/mm/aa)." },
      { titulo: "2. Visita domiciliar y validación de información", texto: "2.- Se solicita al ejecutivo/gerente realizar la visita domiciliaria al cliente y al aval, verificar y validar la información para de ello poder emitir un dictamen." },
      { titulo: "3. Considerar plan de pago semanal", texto: "3.- Se podrá considerar la presente solicitud con plan de pago semanal, esto debido a los importes vencidos que el cliente reporta en su buró de crédito." },
      { titulo: "4. Integrar al cónyuge como aval", texto: "4.- Se solicita integrar al cónyuge como aval, y que cumpla acorde a la política." },
      { titulo: "5. Presentar evidencia documental de actividad productiva", texto: "5.- Se solicita presentar evidencia documental de su actividad productiva y con ello poder emitir un dictamen." },
      { titulo: "6. No acredita arraigo domiciliario", texto: "6.- No acredita arraigo domiciliario." },
      { titulo: "7. Integrar aval que cumpla con política de crédito", texto: "7.- Integrar un aval que cumpla acorde a la política (arraigo, buen historial crediticio y actividad productiva) y con ello poder emitir un dictamen." },
      { titulo: "8. Acreditar ingresos por actividad declarada", texto: "8.- Acreditar los ingresos por su actividad productiva declarada en el cuestionario económico y con ello poder emitir un dictamen." }
    ],
    rechazado: [
      { titulo: "1. Rechazo por mal historial crediticio en buró", texto: "1.- El presente caso se rechaza por el mal historial crediticio que reporta en su buró de crédito." },
      { titulo: "2. Rechazo por falta de capacidad de pago", texto: "2.- Se rechaza por no tener capacidad de pago." },
      { titulo: "3. Rechazo por avance de crédito vigente (política > 50%)", texto: "3.- Por el momento, la presente solicitud se rechaza debido a que, por el avance que el cliente lleva en su crédito vigente con Asefimex, no cumple con lo dispuesto en la política de crédito (más del 50%)." },
      { titulo: "4. Rechazo por perfil transaccional del cliente", texto: "4.- Por el perfil transaccional del cliente, se rechaza el presente caso." }
    ]
  };

  /* ---------------------------------------------------------
     3. Función para mostrar/ocultar botones de solventación
  --------------------------------------------------------- */
  function actualizarBotonesSolventacion(mostrar) {
    const btnDocumentos = document.getElementById('btnDocumentosCliente');
    const btnCaratula = document.getElementById('btnCaratulaComite');

    if (btnDocumentos && btnCaratula) {
      if (mostrar) {
        btnDocumentos.style.display = 'inline-flex';
        btnCaratula.style.display = 'inline-flex';
      } else {
        btnDocumentos.style.display = 'none';
        btnCaratula.style.display = 'none';
      }
    }
  }

  /* ---------------------------------------------------------
     4. Funciones de navegación de tabs
  --------------------------------------------------------- */
  window.menuActaComite = function () {
    actualizarBotonesSolventacion(true);

    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
      const tabText = tab.textContent.trim();
      if (tabText === 'Dictamen' || tabText === 'Dictamen Quash' || tabText === 'Acta de Comite') {
        tab.hidden = false;
      }
    });

    const firmas = document.getElementById('firmas');
    const dictamen = document.getElementById('dictamen');
    const dictamenQuash = document.getElementById('dictamenQuash');
    const historial = document.getElementById('historial');
    const tipoActa = document.getElementById('tipoActa');
    const generarActa = document.getElementById('generarActa');
    const cargaDocumentos = document.getElementById('cargaDocumentos');
    const tabCarga = document.getElementById('tabCargaDocumentos');
    const aplicacionPagos = document.getElementById('aplicacionPagos');
    const tabPagos = document.getElementById('tabAplicacionPagos');
    const registroGarantia = document.getElementById('registroGarantia');
    const valuacion = document.getElementById('valuacion');
    const factura = document.getElementById('factura');
    const testimonioNotarial = document.getElementById('testimonioNotarial');
    const actaPosesion = document.getElementById('actaPosesion');
    const reciboSimple = document.getElementById('reciboSimple');
    const constanciaPosesion = document.getElementById('constanciaPosesion');

    if (dictamen) dictamen.hidden = true;
    if (dictamenQuash) dictamenQuash.hidden = true;
    if (historial) historial.hidden = true;
    if (cargaDocumentos) cargaDocumentos.hidden = true;
    if (aplicacionPagos) aplicacionPagos.hidden = true;
    if (registroGarantia) registroGarantia.hidden = true;
    if (valuacion) valuacion.hidden = true;
    if (factura) factura.hidden = true;
    if (testimonioNotarial) testimonioNotarial.hidden = true;
    if (actaPosesion) actaPosesion.hidden = true;
    if (reciboSimple) reciboSimple.hidden = true;
    if (constanciaPosesion) constanciaPosesion.hidden = true;
    if (firmas) firmas.hidden = false;
    if (tipoActa) tipoActa.hidden = false;
    if (generarActa) generarActa.hidden = false;
    if (tabCarga) tabCarga.hidden = true;
    if (tabPagos) tabPagos.hidden = true;

    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    const actaTab = document.querySelector('.tab[data-tab="receptora"]');
    if (actaTab) actaTab.classList.add('active');
  };

  window.mostrarDictamen = function () {
    actualizarBotonesSolventacion(true);

    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
      const tabText = tab.textContent.trim();
      if (tabText === 'Dictamen' || tabText === 'Dictamen Quash' || tabText === 'Acta de Comite') {
        tab.hidden = false;
      }
    });

    const firmas = document.getElementById('firmas');
    const dictamen = document.getElementById('dictamen');
    const dictamenQuash = document.getElementById('dictamenQuash');
    const historial = document.getElementById('historial');
    const tipoActa = document.getElementById('tipoActa');
    const generarActa = document.getElementById('generarActa');
    const cargaDocumentos = document.getElementById('cargaDocumentos');
    const tabCarga = document.getElementById('tabCargaDocumentos');
    const aplicacionPagos = document.getElementById('aplicacionPagos');
    const tabPagos = document.getElementById('tabAplicacionPagos');
    const registroGarantia = document.getElementById('registroGarantia');
    const valuacion = document.getElementById('valuacion');
    const factura = document.getElementById('factura');
    const testimonioNotarial = document.getElementById('testimonioNotarial');
    const actaPosesion = document.getElementById('actaPosesion');
    const reciboSimple = document.getElementById('reciboSimple');
    const constanciaPosesion = document.getElementById('constanciaPosesion');

    if (dictamen) dictamen.hidden = false;
    if (dictamenQuash) dictamenQuash.hidden = true;
    if (historial) historial.hidden = false;
    if (tipoActa) tipoActa.hidden = true;
    if (generarActa) generarActa.hidden = true;
    if (cargaDocumentos) cargaDocumentos.hidden = true;
    if (aplicacionPagos) aplicacionPagos.hidden = true;
    if (registroGarantia) registroGarantia.hidden = true;
    if (valuacion) valuacion.hidden = true;
    if (factura) factura.hidden = true;
    if (testimonioNotarial) testimonioNotarial.hidden = true;
    if (actaPosesion) actaPosesion.hidden = true;
    if (reciboSimple) reciboSimple.hidden = true;
    if (constanciaPosesion) constanciaPosesion.hidden = true;
    if (firmas) firmas.hidden = false;
    if (tabCarga) tabCarga.hidden = false;
    if (tabPagos) tabPagos.hidden = false;

    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    const dictamenTab = document.querySelector('.tab[data-tab="dictamen"]');
    if (dictamenTab) dictamenTab.classList.add('active');

    const dictamenHeader = document.querySelector('#dictamen .card-header h2');
    if (dictamenHeader) dictamenHeader.textContent = 'Resolución de Comité de Crédito';
  };

  window.mostrarDictamenQuash = function () {
    actualizarBotonesSolventacion(true);

    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
      const tabText = tab.textContent.trim();
      if (tabText === 'Dictamen' || tabText === 'Dictamen Quash' || tabText === 'Acta de Comite') {
        tab.hidden = false;
      }
    });

    const firmas = document.getElementById('firmas');
    const dictamen = document.getElementById('dictamen');
    const dictamenQuash = document.getElementById('dictamenQuash');
    const historial = document.getElementById('historial');
    const tipoActa = document.getElementById('tipoActa');
    const generarActa = document.getElementById('generarActa');
    const cargaDocumentos = document.getElementById('cargaDocumentos');
    const tabCarga = document.getElementById('tabCargaDocumentos');
    const aplicacionPagos = document.getElementById('aplicacionPagos');
    const tabPagos = document.getElementById('tabAplicacionPagos');
    const registroGarantia = document.getElementById('registroGarantia');
    const valuacion = document.getElementById('valuacion');
    const factura = document.getElementById('factura');
    const testimonioNotarial = document.getElementById('testimonioNotarial');
    const actaPosesion = document.getElementById('actaPosesion');
    const reciboSimple = document.getElementById('reciboSimple');
    const constanciaPosesion = document.getElementById('constanciaPosesion');

    if (dictamen) dictamen.hidden = true;
    if (dictamenQuash) dictamenQuash.hidden = false;
    if (historial) historial.hidden = true;
    if (tipoActa) tipoActa.hidden = true;
    if (generarActa) generarActa.hidden = true;
    if (cargaDocumentos) cargaDocumentos.hidden = true;
    if (aplicacionPagos) aplicacionPagos.hidden = true;
    if (registroGarantia) registroGarantia.hidden = true;
    if (valuacion) valuacion.hidden = true;
    if (factura) factura.hidden = true;
    if (testimonioNotarial) testimonioNotarial.hidden = true;
    if (actaPosesion) actaPosesion.hidden = true;
    if (reciboSimple) reciboSimple.hidden = true;
    if (constanciaPosesion) constanciaPosesion.hidden = true;
    if (firmas) firmas.hidden = true;
    if (tabCarga) tabCarga.hidden = false;
    if (tabPagos) tabPagos.hidden = false;

    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    const quashTab = document.querySelector('.tab[data-tab="dictamen-quash"]');
    if (quashTab) quashTab.classList.add('active');

    actualizarDatosQuash();
  };

  function actualizarDatosQuash() {
    const quashData = {
      resultado: 'AUTORIZADO',
      score: '69%',
      observaciones: 'No aplica',
      edad: 'No aplica',
      sexo: 'Agregar pareja como co acreditado',
      estadoCivil: 'Validar criterio estado civil femenino',
      actividadEconomica: 'No aplica',
      consultaHC: 'No aplica'
    };

    const resultadoEl = document.getElementById('quashResultado');
    if (resultadoEl) {
      resultadoEl.textContent = quashData.resultado;
      resultadoEl.className = 'quash-value';
      if (quashData.resultado === 'AUTORIZADO') {
        resultadoEl.classList.add('quash-autorizado');
      } else if (quashData.resultado === 'OBSERVADO') {
        resultadoEl.classList.add('quash-observado');
      } else if (quashData.resultado === 'RECHAZADO') {
        resultadoEl.classList.add('quash-rechazado');
      }
    }

    const scoreEl = document.getElementById('quashScore');
    if (scoreEl) scoreEl.textContent = quashData.score;

    const observacionesEl = document.getElementById('quashObservaciones');
    if (observacionesEl) observacionesEl.textContent = quashData.observaciones;

    const edadEl = document.getElementById('quashEdad');
    if (edadEl) edadEl.textContent = quashData.edad;

    const sexoEl = document.getElementById('quashSexo');
    if (sexoEl) sexoEl.textContent = quashData.sexo;

    const estadoCivilEl = document.getElementById('quashEstadoCivil');
    if (estadoCivilEl) estadoCivilEl.textContent = quashData.estadoCivil;

    const actividadEl = document.getElementById('quashActividadEconomica');
    if (actividadEl) actividadEl.textContent = quashData.actividadEconomica;

    const consultaEl = document.getElementById('quashConsultaHC');
    if (consultaEl) consultaEl.textContent = quashData.consultaHC;
  }

  /* ---------------------------------------------------------
     5. Funcionalidad de resolución
  --------------------------------------------------------- */
  const wrapperResolucionPredefinida = document.getElementById('wrapperResolucionPredefinida');
  const resolucionPredefinidaSelect = document.getElementById('resolucionPredefinida');
  const resolucionComiteTextarea = document.getElementById('resolucionComite');
  const btnLimpiarResolucion = document.getElementById('btnLimpiarResolucion');

  if (btnLimpiarResolucion) {
    btnLimpiarResolucion.addEventListener('click', () => {
      if (resolucionComiteTextarea && resolucionComiteTextarea.value.trim() !== '') {
        if (confirm('¿Estás seguro de que quieres limpiar el texto de la resolución?')) {
          resolucionComiteTextarea.value = '';
          marcarUltimaModificacion();
        }
      }
    });
  }

  function actualizarDesplegablePredefinido() {
    const estado = autorizacionSelect ? autorizacionSelect.value : '';
    if (resolucionPredefinidaSelect) resolucionPredefinidaSelect.innerHTML = '';

    if (estado && PLANTILLAS_RESOLUCION[estado] && resolucionPredefinidaSelect) {
      const optDefault = document.createElement('option');
      optDefault.value = "";
      optDefault.textContent = "Ninguna (Entrada manual) / Seleccione una plantilla...";
      resolucionPredefinidaSelect.appendChild(optDefault);

      PLANTILLAS_RESOLUCION[estado].forEach((item, index) => {
        const opt = document.createElement('option');
        opt.value = index;
        opt.textContent = item.titulo;
        resolucionPredefinidaSelect.appendChild(opt);
      });

      if (wrapperResolucionPredefinida) wrapperResolucionPredefinida.style.display = 'flex';
    } else {
      if (wrapperResolucionPredefinida) wrapperResolucionPredefinida.style.display = 'none';
    }
  }

  if (autorizacionSelect) {
    autorizacionSelect.addEventListener('change', () => {
      const estado = autorizacionSelect.value;

      if (estado === 'autorizado') {
        if (fechaAprobacionInput && (!fechaAprobacionInput.value || fechaAprobacionInput.value === '—')) {
          fechaAprobacionInput.value = formatearFecha(new Date());
        }
      } else {
        if (fechaAprobacionInput) fechaAprobacionInput.value = '';
      }

      if (estado) {
        if (fechaResolucionInput) fechaResolucionInput.value = formatearFecha(new Date());
      } else {
        if (fechaResolucionInput) fechaResolucionInput.value = '';
      }

      actualizarDesplegablePredefinido();
      marcarUltimaModificacion();
    });
  }

  if (resolucionPredefinidaSelect) {
    resolucionPredefinidaSelect.addEventListener('change', () => {
      const estado = autorizacionSelect ? autorizacionSelect.value : '';
      const indexSelected = resolucionPredefinidaSelect.value;

      if (estado && indexSelected !== "" && PLANTILLAS_RESOLUCION[estado] && PLANTILLAS_RESOLUCION[estado][indexSelected]) {
        const currentText = resolucionComiteTextarea ? resolucionComiteTextarea.value.trim() : '';
        const newText = PLANTILLAS_RESOLUCION[estado][indexSelected].texto;

        if (resolucionComiteTextarea) {
          if (currentText) {
            resolucionComiteTextarea.value = currentText + '\n' + newText;
          } else {
            resolucionComiteTextarea.value = newText;
          }
        }

        resolucionPredefinidaSelect.value = "";
        marcarUltimaModificacion();
      }
    });
  }

  const camposDictamenIds = ['montoAprobado', 'plazo', 'tasa', 'nivelRiesgo', 'resolucionComite', 'periodicidad'];
  camposDictamenIds.forEach(id => {
    const campo = document.getElementById(id);
    if (campo) {
      campo.addEventListener('input', marcarUltimaModificacion);
      campo.addEventListener('change', marcarUltimaModificacion);
    }
  });

  [presidenteTipo, presidenteNombre, secretariaTipo, secretariaNombre, firmaExtraordinaria].forEach(campo => {
    if (campo) {
      campo.addEventListener('change', marcarUltimaModificacion);
    }
  });

  const btnGuardar = document.getElementById('guardarResolucion');

  if (btnGuardar) {
    btnGuardar.addEventListener('click', () => {
      marcarUltimaModificacion();

      const textoOriginal = btnGuardar.textContent;
      btnGuardar.textContent = '✓ Resolución Guardada';
      btnGuardar.classList.add('saved');

      setTimeout(() => {
        btnGuardar.textContent = textoOriginal;
        btnGuardar.classList.remove('saved');
      }, 1800);
    });
  }

  /* ---------------------------------------------------------
     6. Historial de Créditos
  --------------------------------------------------------- */
  const HC_DATOS = [
    { otorgante: 'BANCOS', tipo: 'PP', saldoActual: 0, saldoVencido: 0, pagoActual: 'V', ultimoPago: '2018-06-06', frecuencia: 'Semanal', monto: 0 },
    { otorgante: 'BANCOS', tipo: 'PP', saldoActual: 0, saldoVencido: 0, pagoActual: 'V', ultimoPago: '2018-09-28', frecuencia: 'Semanal', monto: 0 },
    { otorgante: 'ASEFIMEX', tipo: 'PP', saldoActual: 16286, saldoVencido: 0, pagoActual: 'V', ultimoPago: '2026-05-28', frecuencia: 'Pago Mínimo Revolvente', monto: 2975 }
  ];

  function formatMXN(v) {
    return '$' + v.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function renderHistorialCreditos() {
    const tbody = document.getElementById('hcTableBody');
    if (!tbody) return;
    tbody.innerHTML = '';

    HC_DATOS.forEach(row => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${row.otorgante}</td>
        <td>${row.tipo}</td>
        <td>${formatMXN(row.saldoActual)}</td>
        <td>${formatMXN(row.saldoVencido)}</td>
        <td>${row.pagoActual}</td>
        <td>${row.ultimoPago}</td>
        <td>${row.frecuencia}</td>
        <td>${formatMXN(row.monto)}</td>
      `;
      tbody.appendChild(tr);
    });

    const totalSaldoActual = HC_DATOS.reduce((s, r) => s + r.saldoActual, 0);
    const totalSaldoVencido = HC_DATOS.reduce((s, r) => s + r.saldoVencido, 0);

    const totalActual = document.getElementById('hcTotalSaldoActual');
    const totalVencido = document.getElementById('hcTotalSaldoVencido');
    if (totalActual) totalActual.textContent = formatMXN(totalSaldoActual);
    if (totalVencido) totalVencido.textContent = formatMXN(totalSaldoVencido);

    const freqMap = {};
    HC_DATOS.forEach(r => {
      freqMap[r.frecuencia] = (freqMap[r.frecuencia] || 0) + r.monto;
    });
    const freqList = document.getElementById('hcFreqList');
    if (!freqList) return;
    freqList.innerHTML = '';
    Object.entries(freqMap).forEach(([frec, total]) => {
      const div = document.createElement('div');
      div.className = 'hc-freq-row';
      div.innerHTML = `<span>${frec}</span><span>${formatMXN(total)}</span>`;
      freqList.appendChild(div);
    });
  }

  renderHistorialCreditos();

  /* ---------------------------------------------------------
     7. CARGA DE DOCUMENTOS - VISTA Y FUNCIONALIDAD
  --------------------------------------------------------- */
  const DOCUMENTOS_DATA = [
    { id: 1, nombre: 'Identificación Oficial', archivo: '', comentario: '' },
    { id: 2, nombre: 'CURP', archivo: '', comentario: '' },
    { id: 3, nombre: 'RFC', archivo: '', comentario: '' },
    { id: 4, nombre: 'Acta de Nacimiento', archivo: '', comentario: '' },
    { id: 5, nombre: 'Comprobante de Domicilio', archivo: '', comentario: '' },
    { id: 6, nombre: 'Permiso de Circulación', archivo: '', comentario: '' },
    { id: 7, nombre: 'Autorizacion para Consulta en Sociedades Crediticias', archivo: '', comentario: '' },
    { id: 8, nombre: 'Reporte de Circulo de Crédito Cliente', archivo: '', comentario: '' },
    { id: 9, nombre: 'Reporte Fotografico y visita domiciliar', archivo: '', comentario: '' },
    { id: 10, nombre: 'Estado de Cuenta ASEFIMEX', archivo: '', comentario: '' }
  ];

  function renderCargaDocumentos() {
    const tbody = document.getElementById('docTableBody');
    if (!tbody) return;
    tbody.innerHTML = '';

    DOCUMENTOS_DATA.forEach(doc => {
      const tr = document.createElement('tr');
      const fileId = `file_${doc.id}`;

      tr.innerHTML = `
        <td style="text-align: left;"><strong>${doc.nombre}</strong></td>
        <td style="text-align: left;">
          <span class="file-name" id="fileName_${doc.id}">${doc.archivo || 'Ningún archivo seleccionado'}</span>
        </td>
        <td style="text-align: center;">
          <button class="btn-icon" onclick="verDocumento(${doc.id})" title="Ver documento">👁️</button>
        </td>
        <td style="text-align: center;">
          <label class="file-label" for="${fileId}">
              Subir
            <input type="file" id="${fileId}" onchange="subirDocumento(${doc.id}, this)">
          </label>
        </td>
        <td style="text-align: left;">
          <input type="text" class="doc-comment" id="comment_${doc.id}" placeholder="Agregar comentario..." value="${doc.comentario || ''}" onchange="guardarComentario(${doc.id}, this.value)">
        </td>
      `;
      tbody.appendChild(tr);
    });
  }
  /* AVAL */
  function renderCargaDocumentosAval() {
    const tbody = document.getElementById('docTableBodyAval');
    if (!tbody) return;
    tbody.innerHTML = '';

    const DOCUMENTOS_DATA_AVAL = [
      { id: 1, nombre: 'Identificación Oficial Aval', archivo: '', comentario: '' },
      { id: 2, nombre: 'CURP Aval', archivo: '', comentario: '' },
      { id: 3, nombre: 'RFC Aval', archivo: '', comentario: '' },
      { id: 4, nombre: 'Acta de Nacimiento Aval', archivo: '', comentario: '' },
      { id: 5, nombre: 'Comprobante de Domicilio Aval', archivo: '', comentario: '' },
      { id: 7, nombre: 'Autorizacion para Consulta en Sociedades Crediticias Aval', archivo: '', comentario: '' },
      { id: 8, nombre: 'Reporte de Circulo de Crédito Cliente Aval', archivo: '', comentario: '' }
    ];

    DOCUMENTOS_DATA_AVAL.forEach(doc => {
      const tr = document.createElement('tr');
      const fileId = `file_${doc.id}`;

      tr.innerHTML = `
        <td style="text-align: left;"><strong>${doc.nombre}</strong></td>
        <td style="text-align: left;">
          <span class="file-name" id="fileName_${doc.id}">${doc.archivo || 'Ningún archivo seleccionado'}</span>
        </td>
        <td style="text-align: center;">
          <button class="btn-icon" onclick="verDocumento(${doc.id})" title="Ver documento">👁️</button>
        </td>
        <td style="text-align: center;">
          <label class="file-label" for="${fileId}">
              Subir
            <input type="file" id="${fileId}" onchange="subirDocumento(${doc.id}, this)">
          </label>
        </td>
        <td style="text-align: left;">
          <input type="text" class="doc-comment" id="comment_${doc.id}" placeholder="Agregar comentario..." value="${doc.comentario || ''}" onchange="guardarComentario(${doc.id}, this.value)">
        </td>
      `;
      tbody.appendChild(tr);
    });
  }

  /* SEGUNDO AVAL */
  const DOCUMENTOS_DATA_SEGUNDO_AVAL = [
    { id: 1, nombre: 'Identificación Oficial Segundo Aval', archivo: '', comentario: '' },
    { id: 2, nombre: 'CURP Segundo Aval', archivo: '', comentario: '' },
    { id: 3, nombre: 'RFC Segundo Aval', archivo: '', comentario: '' },
    { id: 4, nombre: 'Acta de Nacimiento Segundo Aval', archivo: '', comentario: '' },
    { id: 5, nombre: 'Comprobante de Domicilio Segundo Aval', archivo: '', comentario: '' },
    { id: 7, nombre: 'Autorizacion para Consulta en Sociedades Crediticias Segundo Aval', archivo: '', comentario: '' },
    { id: 8, nombre: 'Reporte de Circulo de Crédito Cliente Segundo Aval', archivo: '', comentario: '' }
  ];

  function renderCargaDocumentosSegundoAval() {
    const tbody = document.getElementById('docTableBodySegundoAval');
    if (!tbody) return;
    tbody.innerHTML = '';

    DOCUMENTOS_DATA_SEGUNDO_AVAL.forEach(doc => {
      const tr = document.createElement('tr');
      const fileId = `file_${doc.id}`;

      tr.innerHTML = `
        <td style="text-align: left;"><strong>${doc.nombre}</strong></td>
        <td style="text-align: left;">
          <span class="file-name" id="fileName_${doc.id}">${doc.archivo || 'Ningún archivo seleccionado'}</span>
        </td>
        <td style="text-align: center;">
          <button class="btn-icon" onclick="verDocumento(${doc.id})" title="Ver documento">👁️</button>
        </td>
        <td style="text-align: center;">
          <label class="file-label" for="${fileId}">
              Subir
            <input type="file" id="${fileId}" onchange="subirDocumento(${doc.id}, this)">
          </label>
        </td>
        <td style="text-align: left;">
          <input type="text" class="doc-comment" id="comment_${doc.id}" placeholder="Agregar comentario..." value="${doc.comentario || ''}" onchange="guardarComentario(${doc.id}, this.value)">
        </td>
      `;
      tbody.appendChild(tr);
    });
  }

  /* TERMINA SEGUNDO AVAL */

  /* DOCUMENTOS ADICIONALES AL EXPEDIENTE */
  const DOCUMENTOS_DATA_ADICIONALES = [
    { id: 1, nombre: 'Check List Mesa de Control', archivo: '', comentario: '' },
    { id: 2, nombre: 'Caratula del Comité de Crédito', archivo: '', comentario: '' },
    { id: 3, nombre: 'Carta Excepcion a la Norma', archivo: '', comentario: '' },
    { id: 4, nombre: 'Solicitud de Crédito para Personas Físicas/Personas Morales', archivo: '', comentario: '' },
    { id: 5, nombre: 'Comprobante de Ingresos', archivo: '', comentario: '' },
    { id: 7, nombre: 'Comprobante de Arraigo Domiciliar', archivo: '', comentario: '' },
    { id: 8, nombre: 'Evidencia de la actividad (Garantia ó Comprobante de Experiencia)', archivo: '', comentario: '' },
    { id: 9, nombre: 'Comprobante de Pago de deudas', archivo: '', comentario: '' },
    { id: 10, nombre: 'Factura de Garantia Natural', archivo: '', comentario: '' },
    { id: 11, nombre: 'Copia de Deposito de Enganche', archivo: '', comentario: '' },
    { id: 12, nombre: 'Comision por Apertura de Crédito', archivo: '', comentario: '' },
    { id: 13, nombre: 'Estado de Cuenta Bancario', archivo: '', comentario: '' },
    { id: 14, nombre: 'Contrato GPS', archivo: '', comentario: '' },
    { id: 15, nombre: 'Carta de aceptación de endoso', archivo: '', comentario: '' },
    { id: 16, nombre: 'Garantia Liquida', archivo: '', comentario: '' },
    { id: 17, nombre: 'Cofinanciamiento', archivo: '', comentario: '' },
    { id: 18, nombre: 'Enganche Diferido', archivo: '', comentario: '' },
    { id: 19, nombre: 'Complemento de Enganche', archivo: '', comentario: '' },
    { id: 20, nombre: 'Enganche GPS', archivo: '', comentario: '' },
    { id: 21, nombre: 'Carta Factura', archivo: '', comentario: '' },
    { id: 22, nombre: 'Aceptación de Endoso', archivo: '', comentario: '' },
    { id: 23, nombre: 'Factura de Garantia Adicional 1', archivo: '', comentario: '' },
    { id: 24, nombre: 'Factura de Garantia Adicional 2', archivo: '', comentario: '' },
    { id: 25, nombre: 'Pagare de Distribuidor', archivo: '', comentario: '' },
    { id: 26, nombre: 'Cotización de Seguro', archivo: '', comentario: '' },
    { id: 27, nombre: 'Poliza de Seguro', archivo: '', comentario: '' },
    { id: 28, nombre: 'Comprobante de Pago de Seguro', archivo: '', comentario: '' },
    { id: 29, nombre: 'Solicitud de Instalación de GPS', archivo: '', comentario: '' },
    { id: 30, nombre: 'Validación de Factura SAT', archivo: '', comentario: '' },
    { id: 31, nombre: 'Otros', archivo: '', comentario: '' }
  ];

  function renderCargaDocumentosAdicionales() {
    const tbody = document.getElementById('docTableBodyAdicionales');
    if (!tbody) return;
    tbody.innerHTML = '';

    DOCUMENTOS_DATA_ADICIONALES.forEach(doc => {
      const tr = document.createElement('tr');
      const fileId = `file_${doc.id}`;

      tr.innerHTML = `
        <td style="text-align: left;"><strong>${doc.nombre}</strong></td>
        <td style="text-align: left;">
          <span class="file-name" id="fileName_${doc.id}">${doc.archivo || 'Ningún archivo seleccionado'}</span>
        </td>
        <td style="text-align: center;">
          <button class="btn-icon" onclick="verDocumento(${doc.id})" title="Ver documento">👁️</button>
        </td>
        <td style="text-align: center;">
          <label class="file-label" for="${fileId}">
              Subir
            <input type="file" id="${fileId}" onchange="subirDocumento(${doc.id}, this)">
          </label>
        </td>
        <td style="text-align: left;">
          <input type="text" class="doc-comment" id="comment_${doc.id}" placeholder="Agregar comentario..." value="${doc.comentario || ''}" onchange="guardarComentario(${doc.id}, this.value)">
        </td>
      `;
      tbody.appendChild(tr);
    });
  }

  /* TERMINA DOCUMENTOS ADICIONALES AL EXPEDIENTE */

  window.subirDocumento = function (id, input) {
    const file = input.files[0];
    if (file) {
      const doc = DOCUMENTOS_DATA.find(d => d.id === id);
      if (doc) {
        doc.archivo = file.name;
        const fileNameSpan = document.getElementById(`fileName_${id}`);
        if (fileNameSpan) {
          fileNameSpan.textContent = file.name;
        }
        const label = input.closest('.file-label');
        if (label) {
          label.classList.add('selected');
          label.innerHTML = `✅ ${file.name.substring(0, 15)}${file.name.length > 15 ? '...' : ''}`;
          const newInput = document.createElement('input');
          newInput.type = 'file';
          newInput.id = input.id;
          newInput.onchange = function () { window.subirDocumento(id, this); };
          label.appendChild(newInput);
        }
        marcarUltimaModificacion();
      }
    }
  };

  window.verDocumento = function (id) {
    const doc = DOCUMENTOS_DATA.find(d => d.id === id);
    if (doc && doc.archivo) {
      alert(`Ver documento: ${doc.archivo}\n(En una implementación real, aquí se abriría la vista previa del archivo)`);
    } else {
      alert('No hay archivo subido para este documento.');
    }
  };

  window.guardarComentario = function (id, valor) {
    const doc = DOCUMENTOS_DATA.find(d => d.id === id);
    if (doc) {
      doc.comentario = valor;
      marcarUltimaModificacion();
    }
  };

  window.guardarDocumentos = function () {
    alert('Documentos guardados exitosamente');
  };

  renderCargaDocumentos();
  renderCargaDocumentosAval();
  renderCargaDocumentosSegundoAval();
  renderCargaDocumentosAdicionales();

  /* ---------------------------------------------------------
     8. APLICACIÓN DE PAGOS - VISTA Y FUNCIONALIDAD
     CON COLUMNA ESTATUS Y ALINEACIÓN CORREGIDA
  --------------------------------------------------------- */
  const PAGOS_DATA = [
    { id: 1, nombre: 'Enganche', archivo: '', comentario: '', aplicacion: '', estado: '', estatus: 'pendiente' },
    { id: 2, nombre: 'Garantía Líquida', archivo: '', comentario: '', aplicacion: '', estado: '', estatus: 'pendiente' },
    { id: 3, nombre: 'Comisión por Apertura', archivo: '', comentario: '', aplicacion: '', estado: '', estatus: 'pendiente' },
    { id: 4, nombre: 'Co Financiamiento', archivo: '', comentario: '', aplicacion: '', estado: '', estatus: 'pendiente' },
    { id: 5, nombre: 'Complemento de Enganche', archivo: '', comentario: '', aplicacion: '', estado: '', estatus: 'pendiente' },
    { id: 6, nombre: 'Enganche GPS', archivo: '', comentario: '', aplicacion: '', estado: '', estatus: 'pendiente' },
    { id: 7, nombre: 'Garantia Liquida Enganche Diferido', archivo: '', comentario: '', aplicacion: '', estado: '', estatus: 'pendiente' }
  ];

  let pagoActualId = null;
  let pagoCancelarId = null;

  function renderAplicacionPagos() {
    const tbody = document.getElementById('pagosTableBody');
    if (!tbody) return;
    tbody.innerHTML = '';

    PAGOS_DATA.forEach(pago => {
      const tr = document.createElement('tr');
      const estaAplicado = pago.aplicacion && pago.aplicacion !== '' && pago.estado !== 'cancelado';
      const estaCancelado = pago.estado === 'cancelado';

      let estatusClass = '';
      if (pago.estatus === 'pendiente') estatusClass = 'estatus-pendiente';
      else if (pago.estatus === 'aplicado') estatusClass = 'estatus-aplicado';
      else if (pago.estatus === 'cancelado') estatusClass = 'estatus-cancelado';
      else if (pago.estatus === 'revision') estatusClass = 'estatus-revision';

      tr.innerHTML = `
        <td style="text-align: left;"><strong>${pago.nombre}</strong></td>
        <td style="text-align: left;">
          <span class="file-name" id="pagoFileName_${pago.id}">${pago.archivo || 'Ningún archivo seleccionado'}</span>
        </td>
        <td style="text-align: center;">
          <button class="btn-icon" onclick="verPago(${pago.id})" title="Ver documento">👁️</button>
        </td>
        <td style="text-align: center;">
          <button class="btn-icon" onclick="guardarPagoDocumento(${pago.id})" title="Guardar documento">💾</button>
        </td>
        <td style="text-align: left;">
          <input type="text" class="doc-comment" id="pagoComment_${pago.id}" placeholder="Agregar comentario..." value="${pago.comentario || ''}" onchange="guardarPagoComentario(${pago.id}, this.value)">
        </td>
        <td style="text-align: center;">
          <div class="acciones-pago">
            <button class="btn-aplicar-pago ${estaAplicado ? 'aplicado' : ''} ${estaCancelado ? 'cancelado' : ''}" onclick="abrirModalAplicarPago(${pago.id})">
              ${estaCancelado ? '⛔ Cancelado' : (estaAplicado ? '✓ Aplicado' : 'Aplicar Pago')}
            </button>
          </div>
        </td>
        <td style="text-align: center;">
          <div class="acciones-pago">
            <button class="btn-cancelar-pago ${estaCancelado ? 'cancelado' : ''}" onclick="abrirModalCancelarPago(${pago.id})">
              ${estaCancelado ? '✓ Cancelado' : 'Cancelar Pago'}
            </button>
          </div>
        </td>
        <td style="text-align: center;">
          <select class="select-estatus ${estatusClass}" id="estatus_${pago.id}" onchange="cambiarEstatus(${pago.id}, this.value)">
            <option value="pendiente" ${pago.estatus === 'pendiente' ? 'selected' : ''}>Pendiente</option>
            <option value="aplicado" ${pago.estatus === 'aplicado' ? 'selected' : ''}>Aplicado</option>
            <option value="cancelado" ${pago.estatus === 'cancelado' ? 'selected' : ''}>Cancelado</option>
            <option value="revision" ${pago.estatus === 'revision' ? 'selected' : ''}>En Revisión</option>
          </select>
        </td>
      `;
      tbody.appendChild(tr);
    });
  }

  window.cambiarEstatus = function (id, nuevoEstatus) {
    const pago = PAGOS_DATA.find(p => p.id === id);
    if (pago) {
      pago.estatus = nuevoEstatus;
      marcarUltimaModificacion();

      const select = document.getElementById(`estatus_${id}`);
      if (select) {
        select.className = 'select-estatus';
        if (nuevoEstatus === 'pendiente') select.classList.add('estatus-pendiente');
        else if (nuevoEstatus === 'aplicado') select.classList.add('estatus-aplicado');
        else if (nuevoEstatus === 'cancelado') select.classList.add('estatus-cancelado');
        else if (nuevoEstatus === 'revision') select.classList.add('estatus-revision');
      }

      if (!window._actualizandoEstatus) {
        const estatusTexto = {
          'pendiente': 'Pendiente',
          'aplicado': 'Aplicado',
          'cancelado': 'Cancelado',
          'revision': 'En Revisión'
        };
        alert(`Estatus del documento "${pago.nombre}" actualizado a: ${estatusTexto[nuevoEstatus]}`);
      }
    }
  };

  window.verPago = function (id) {
    const pago = PAGOS_DATA.find(p => p.id === id);
    if (pago && pago.archivo) {
      alert(`Ver documento: ${pago.archivo}\n(En una implementación real, aquí se abriría la vista previa del archivo)`);
    } else {
      alert('No hay archivo subido para este documento.');
    }
  };

  window.guardarPagoDocumento = function (id) {
    const pago = PAGOS_DATA.find(p => p.id === id);
    if (pago && pago.archivo) {
      alert(`Documento "${pago.nombre}" guardado exitosamente.\nArchivo: ${pago.archivo}`);
      marcarUltimaModificacion();
    } else {
      alert('No hay archivo para guardar. Por favor sube un archivo primero.');
    }
  };

  window.guardarPagoComentario = function (id, valor) {
    const pago = PAGOS_DATA.find(p => p.id === id);
    if (pago) {
      pago.comentario = valor;
      marcarUltimaModificacion();
    }
  };

  window.guardarPagos = function () {
    let resumen = 'Resumen de Pagos:\n\n';
    PAGOS_DATA.forEach(p => {
      const estatusTexto = {
        'pendiente': 'Pendiente',
        'aplicado': 'Aplicado',
        'cancelado': 'Cancelado',
        'revision': 'En Revisión'
      };
      resumen += `${p.nombre}: ${estatusTexto[p.estatus] || p.estatus}\n`;
    });
    alert(`Pagos guardados exitosamente.\n\n${resumen}`);
  };

  /* ---------------------------------------------------------
     8.1 FORMATO DE MONEDA PARA EL CAMPO DE MONTO
  --------------------------------------------------------- */
  function formatearMoneda(valor) {
    let limpio = valor.replace(/[^0-9.]/g, '');
    if (limpio === '' || limpio === '.') return '';

    let partes = limpio.split('.');
    let entero = partes[0];
    let decimal = partes[1] || '';

    if (decimal.length > 2) {
      decimal = decimal.substring(0, 2);
    }

    let enteroFormateado = entero.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    if (decimal) {
      return enteroFormateado + '.' + decimal;
    } else {
      return enteroFormateado;
    }
  }

  function inicializarCampoMoneda() {
    const montoInput = document.getElementById('montoAplicado');
    if (!montoInput) return;

    montoInput.addEventListener('input', function (e) {
      let valor = this.value;
      let posicion = this.selectionStart;
      let formateado = formatearMoneda(valor);

      if (formateado !== valor) {
        this.value = formateado;
        let nuevaPosicion = posicion;
        if (formateado.length > valor.length) {
          nuevaPosicion = posicion + (formateado.length - valor.length);
        } else if (formateado.length < valor.length) {
          nuevaPosicion = posicion - (valor.length - formateado.length);
        }
        this.setSelectionRange(nuevaPosicion, nuevaPosicion);
      }
    });

    montoInput.addEventListener('blur', function () {
      let valor = this.value.replace(/,/g, '');
      let numerico = parseFloat(valor);

      if (!isNaN(numerico) && numerico > 0) {
        if (!valor.includes('.')) {
          this.value = formatearMoneda(valor + '.00');
        } else {
          let partes = valor.split('.');
          if (partes[1].length === 1) {
            this.value = formatearMoneda(valor + '0');
          } else {
            this.value = formatearMoneda(valor);
          }
        }
      } else if (this.value !== '') {
        this.value = '';
      }
    });

    montoInput.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        this.blur();
      }
    });
  }

  /* ---------------------------------------------------------
     8.2 MODAL APLICACIÓN DE PAGOS
  --------------------------------------------------------- */
  window.abrirModalAplicarPago = function (id) {
    const pago = PAGOS_DATA.find(p => p.id === id);
    if (!pago) return;

    pagoActualId = id;

    const modal = document.getElementById('modalAplicarPago');
    const docName = document.getElementById('modalDocName');
    if (docName) {
      docName.innerHTML = `Documento: <strong>${pago.nombre}</strong>`;
    }

    const radios = document.querySelectorAll('input[name="pregunta1"]');
    radios.forEach(r => r.checked = false);

    const montoInput = document.getElementById('montoAplicado');
    if (montoInput) {
      montoInput.value = '';
      inicializarCampoMoneda();
    }

    const fechaInput = document.getElementById('fechaAplicacion');
    if (fechaInput) {
      const hoy = new Date().toISOString().split('T')[0];
      fechaInput.value = hoy;
    }

    const formaPago = document.getElementById('formaPago');
    if (formaPago) formaPago.value = '';

    const comentarios = document.getElementById('comentariosPago');
    if (comentarios) comentarios.value = '';

    if (modal) modal.style.display = 'flex';
  };

  window.cerrarModalAplicarPago = function () {
    const modal = document.getElementById('modalAplicarPago');
    if (modal) modal.style.display = 'none';
    pagoActualId = null;
  };

  window.confirmarAplicarPago = function () {
    if (pagoActualId === null) {
      alert('Error: No se seleccionó un pago.');
      return;
    }

    const pregunta1 = document.querySelector('input[name="pregunta1"]:checked');
    const montoInput = document.getElementById('montoAplicado');
    const fecha = document.getElementById('fechaAplicacion');
    const formaPago = document.getElementById('formaPago');

    if (!pregunta1) {
      alert('Por favor, selecciona si se realizó el pago.');
      return;
    }

    if (!montoInput || !montoInput.value) {
      alert('Por favor, ingresa un monto válido.');
      return;
    }

    const montoValor = parseFloat(montoInput.value.replace(/,/g, ''));
    if (isNaN(montoValor) || montoValor <= 0) {
      alert('Por favor, ingresa un monto válido.');
      return;
    }

    if (!fecha || !fecha.value) {
      alert('Por favor, selecciona la fecha de aplicación.');
      return;
    }

    if (!formaPago || !formaPago.value) {
      alert('Por favor, selecciona la forma de pago.');
      return;
    }

    const datosPago = {
      id: pagoActualId,
      documento: PAGOS_DATA.find(p => p.id === pagoActualId)?.nombre || '',
      pagoRealizado: pregunta1.value,
      monto: montoValor,
      fecha: fecha.value,
      formaPago: formaPago.value,
      comentarios: document.getElementById('comentariosPago')?.value || ''
    };

    const pago = PAGOS_DATA.find(p => p.id === pagoActualId);
    if (pago) {
      pago.aplicacion = `Aplicado: $${datosPago.monto.toFixed(2)} - ${datosPago.fecha}`;
      pago.estado = 'aplicado';
      window._actualizandoEstatus = true;
      pago.estatus = 'aplicado';
      window._actualizandoEstatus = false;
    }

    alert(`✅ Pago aplicado exitosamente para:\n\nDocumento: ${datosPago.documento}\nMonto: $${datosPago.monto.toFixed(2)}\nFecha: ${datosPago.fecha}\nForma de pago: ${datosPago.formaPago}\n¿Pago realizado? ${datosPago.pagoRealizado === 'si' ? 'Sí' : datosPago.pagoRealizado === 'no' ? 'No' : 'Parcial'}\n${datosPago.comentarios ? 'Comentarios: ' + datosPago.comentarios : ''}`);

    cerrarModalAplicarPago();
    renderAplicacionPagos();
    marcarUltimaModificacion();
  };

  /* ---------------------------------------------------------
     8.3 MODAL CANCELAR PAGO
  --------------------------------------------------------- */
  window.abrirModalCancelarPago = function (id) {
    const pago = PAGOS_DATA.find(p => p.id === id);
    if (!pago) return;

    pagoCancelarId = id;

    const modal = document.getElementById('modalCancelarPago');
    const docName = document.getElementById('modalCancelDocName');
    if (docName) {
      docName.innerHTML = `Documento: <strong>${pago.nombre}</strong>`;
    }

    const radios = document.querySelectorAll('input[name="cancelPregunta1"]');
    radios.forEach(r => r.checked = false);

    const motivo = document.getElementById('motivoCancelacion');
    if (motivo) motivo.value = '';

    const fecha = document.getElementById('fechaCancelacion');
    if (fecha) {
      const hoy = new Date().toISOString().split('T')[0];
      fecha.value = hoy;
    }

    const comentarios = document.getElementById('comentariosCancelacion');
    if (comentarios) comentarios.value = '';

    if (modal) modal.style.display = 'flex';
  };

  window.cerrarModalCancelarPago = function () {
    const modal = document.getElementById('modalCancelarPago');
    if (modal) modal.style.display = 'none';
    pagoCancelarId = null;
  };

  window.confirmarCancelarPago = function () {
    if (pagoCancelarId === null) {
      alert('Error: No se seleccionó un pago.');
      return;
    }

    const pregunta1 = document.querySelector('input[name="cancelPregunta1"]:checked');
    const motivo = document.getElementById('motivoCancelacion');
    const fecha = document.getElementById('fechaCancelacion');

    if (!pregunta1) {
      alert('Por favor, selecciona si se canceló el pago.');
      return;
    }

    if (!motivo || !motivo.value) {
      alert('Por favor, selecciona un motivo de cancelación.');
      return;
    }

    if (!fecha || !fecha.value) {
      alert('Por favor, selecciona la fecha de cancelación.');
      return;
    }

    const datosCancelacion = {
      id: pagoCancelarId,
      documento: PAGOS_DATA.find(p => p.id === pagoCancelarId)?.nombre || '',
      cancelado: pregunta1.value,
      motivo: motivo.value,
      fecha: fecha.value,
      comentarios: document.getElementById('comentariosCancelacion')?.value || ''
    };

    const pago = PAGOS_DATA.find(p => p.id === pagoCancelarId);
    if (pago) {
      pago.aplicacion = `Cancelado: ${datosCancelacion.motivo} - ${datosCancelacion.fecha}`;
      pago.estado = 'cancelado';
      window._actualizandoEstatus = true;
      pago.estatus = 'cancelado';
      window._actualizandoEstatus = false;
    }

    const motivosTexto = {
      'pago_duplicado': 'Pago duplicado',
      'error_monto': 'Error en el monto',
      'error_cliente': 'Error en datos del cliente',
      'cancelacion_solicitud': 'Cancelación de la solicitud',
      'rechazo_credito': 'Rechazo del crédito',
      'otros': 'Otros'
    };

    alert(`⛔ Pago cancelado exitosamente para:\n\nDocumento: ${datosCancelacion.documento}\nMotivo: ${motivosTexto[datosCancelacion.motivo] || datosCancelacion.motivo}\nFecha: ${datosCancelacion.fecha}\n${datosCancelacion.comentarios ? 'Comentarios: ' + datosCancelacion.comentarios : ''}`);

    cerrarModalCancelarPago();
    renderAplicacionPagos();
    marcarUltimaModificacion();
  };

  document.addEventListener('click', function (event) {
    const modalAplicar = document.getElementById('modalAplicarPago');
    if (modalAplicar && event.target === modalAplicar) {
      cerrarModalAplicarPago();
    }
    const modalCancelar = document.getElementById('modalCancelarPago');
    if (modalCancelar && event.target === modalCancelar) {
      cerrarModalCancelarPago();
    }
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      cerrarModalAplicarPago();
      cerrarModalCancelarPago();
    }
  });

  renderAplicacionPagos();

  /* ---------------------------------------------------------
     9. FUNCIÓN PARA CAMBIAR VISTA DESDE STAGE SIDEBAR
  --------------------------------------------------------- */

  window.cambiarVista = function (vista) {
    document.querySelectorAll('.stage-btn').forEach(b => b.classList.remove('stage-active'));

    document.querySelectorAll('.stage-btn').forEach(b => {
      if (b.textContent.trim() === vista) {
        b.classList.add('stage-active');
      }
    });

    if (vista === 'Carga de Documentos') {
      window.mostrarCargaDocumentos();
      return;
    }

    if (vista === 'Aplicación de Pagos') {
      window.mostrarAplicacionPagos();
      return;
    }

    if (vista === 'Registro de Garantía y Otros') {
      window.mostrarRegistroGarantia();
      return;
    }

    // Vista por defecto: Decisiones
    actualizarBotonesSolventacion(true);

    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
      const tabText = tab.textContent.trim();
      if (tabText === 'Dictamen' || tabText === 'Dictamen Quash' || tabText === 'Acta de Comite') {
        tab.hidden = false;
      }
    });

    window.mostrarDictamen();
    const dictamenHeader = document.querySelector('#dictamen .card-header h2');
    if (dictamenHeader) dictamenHeader.textContent = 'Resolución de Comité de Crédito';
  };

  /* ---------------------------------------------------------
     10. FUNCIÓN PARA MOSTRAR CARGA DE DOCUMENTOS
  --------------------------------------------------------- */
  window.mostrarCargaDocumentos = function () {
    actualizarBotonesSolventacion(false);

    const firmas = document.getElementById('firmas');
    const dictamen = document.getElementById('dictamen');
    const dictamenQuash = document.getElementById('dictamenQuash');
    const historial = document.getElementById('historial');
    const tipoActa = document.getElementById('tipoActa');
    const generarActa = document.getElementById('generarActa');
    const cargaDocumentos = document.getElementById('cargaDocumentos');
    const tabCarga = document.getElementById('tabCargaDocumentos');
    const aplicacionPagos = document.getElementById('aplicacionPagos');
    const tabPagos = document.getElementById('tabAplicacionPagos');
    const registroGarantia = document.getElementById('registroGarantia');
    const valuacion = document.getElementById('valuacion');
    const factura = document.getElementById('factura');
    const testimonioNotarial = document.getElementById('testimonioNotarial');
    const actaPosesion = document.getElementById('actaPosesion');
    const reciboSimple = document.getElementById('reciboSimple');
    const constanciaPosesion = document.getElementById('constanciaPosesion');

    if (dictamen) dictamen.hidden = true;
    if (dictamenQuash) dictamenQuash.hidden = true;
    if (historial) historial.hidden = true;
    if (tipoActa) tipoActa.hidden = true;
    if (generarActa) generarActa.hidden = true;
    if (firmas) firmas.hidden = true;
    if (cargaDocumentos) cargaDocumentos.hidden = false;
    if (aplicacionPagos) aplicacionPagos.hidden = true;
    if (registroGarantia) registroGarantia.hidden = true;
    if (valuacion) valuacion.hidden = true;
    if (factura) factura.hidden = true;
    if (testimonioNotarial) testimonioNotarial.hidden = true;
    if (actaPosesion) actaPosesion.hidden = true;
    if (reciboSimple) reciboSimple.hidden = true;
    if (constanciaPosesion) constanciaPosesion.hidden = true;
    if (tabCarga) tabCarga.hidden = false;
    if (tabPagos) tabPagos.hidden = true;

    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
      const tabText = tab.textContent.trim();
      if (tabText === 'Dictamen' || tabText === 'Dictamen Quash' || tabText === 'Acta de Comite') {
        tab.hidden = true;
      }
    });

    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    if (tabCarga) tabCarga.classList.add('active');

    const dictamenHeader = document.querySelector('#dictamen .card-header h2');
    if (dictamenHeader) dictamenHeader.textContent = 'Resolución de Comité de Crédito';

    document.querySelectorAll('.stage-btn').forEach(b => {
      b.classList.remove('stage-active');
      if (b.textContent.trim() === 'Carga de Documentos') {
        b.classList.add('stage-active');
      }
    });
  };

  /* ---------------------------------------------------------
     11. FUNCIÓN PARA MOSTRAR APLICACIÓN DE PAGOS
  --------------------------------------------------------- */
  window.mostrarAplicacionPagos = function () {
    actualizarBotonesSolventacion(false);

    const firmas = document.getElementById('firmas');
    const dictamen = document.getElementById('dictamen');
    const dictamenQuash = document.getElementById('dictamenQuash');
    const historial = document.getElementById('historial');
    const tipoActa = document.getElementById('tipoActa');
    const generarActa = document.getElementById('generarActa');
    const cargaDocumentos = document.getElementById('cargaDocumentos');
    const tabCarga = document.getElementById('tabCargaDocumentos');
    const aplicacionPagos = document.getElementById('aplicacionPagos');
    const tabPagos = document.getElementById('tabAplicacionPagos');
    const registroGarantia = document.getElementById('registroGarantia');
    const valuacion = document.getElementById('valuacion');
    const factura = document.getElementById('factura');
    const testimonioNotarial = document.getElementById('testimonioNotarial');
    const actaPosesion = document.getElementById('actaPosesion');
    const reciboSimple = document.getElementById('reciboSimple');
    const constanciaPosesion = document.getElementById('constanciaPosesion');

    if (dictamen) dictamen.hidden = true;
    if (dictamenQuash) dictamenQuash.hidden = true;
    if (historial) historial.hidden = true;
    if (tipoActa) tipoActa.hidden = true;
    if (generarActa) generarActa.hidden = true;
    if (firmas) firmas.hidden = true;
    if (cargaDocumentos) cargaDocumentos.hidden = true;
    if (tabCarga) tabCarga.hidden = true;
    if (aplicacionPagos) aplicacionPagos.hidden = false;
    if (registroGarantia) registroGarantia.hidden = true;
    if (valuacion) valuacion.hidden = true;
    if (factura) factura.hidden = true;
    if (testimonioNotarial) testimonioNotarial.hidden = true;
    if (actaPosesion) actaPosesion.hidden = true;
    if (reciboSimple) reciboSimple.hidden = true;
    if (constanciaPosesion) constanciaPosesion.hidden = true;
    if (tabPagos) tabPagos.hidden = false;

    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
      const tabText = tab.textContent.trim();
      if (tabText === 'Dictamen' || tabText === 'Dictamen Quash' || tabText === 'Acta de Comite') {
        tab.hidden = true;
      }
    });

    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    if (tabPagos) tabPagos.classList.add('active');

    const dictamenHeader = document.querySelector('#dictamen .card-header h2');
    if (dictamenHeader) dictamenHeader.textContent = 'Resolución de Comité de Crédito';

    document.querySelectorAll('.stage-btn').forEach(b => {
      b.classList.remove('stage-active');
      if (b.textContent.trim() === 'Aplicación de Pagos') {
        b.classList.add('stage-active');
      }
    });

    renderAplicacionPagos();
  };

  /* ---------------------------------------------------------
     12. FUNCIÓN PARA MOSTRAR REGISTRO DE GARANTÍA Y OTROS (NUEVA)
  --------------------------------------------------------- */
  window.mostrarRegistroGarantia = function () {
    actualizarBotonesSolventacion(false);

    // Ocultar tabs superiores
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
      const tabText = tab.textContent.trim();
      if (tabText === 'Dictamen' || tabText === 'Dictamen Quash' || tabText === 'Acta de Comite') {
        tab.hidden = true;
      }
    });
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));

    // Ocultar todas las secciones excepto registroGarantia
    const firmas = document.getElementById('firmas');
    const dictamen = document.getElementById('dictamen');
    const dictamenQuash = document.getElementById('dictamenQuash');
    const historial = document.getElementById('historial');
    const tipoActa = document.getElementById('tipoActa');
    const generarActa = document.getElementById('generarActa');
    const cargaDocumentos = document.getElementById('cargaDocumentos');
    const aplicacionPagos = document.getElementById('aplicacionPagos');
    const registroGarantia = document.getElementById('registroGarantia');
    const valuacion = document.getElementById('valuacion');
    const factura = document.getElementById('factura');
    const testimonioNotarial = document.getElementById('testimonioNotarial');
    const actaPosesion = document.getElementById('actaPosesion');
    const reciboSimple = document.getElementById('reciboSimple');
    const constanciaPosesion = document.getElementById('constanciaPosesion');
    const tipoDocumento = document.getElementById('tipoDocumento');

    if (firmas) firmas.hidden = true;
    if (dictamen) dictamen.hidden = true;
    if (dictamenQuash) dictamenQuash.hidden = true;
    if (historial) historial.hidden = true;
    if (tipoActa) tipoActa.hidden = true;
    if (generarActa) generarActa.hidden = true;
    if (cargaDocumentos) cargaDocumentos.hidden = true;
    if (aplicacionPagos) aplicacionPagos.hidden = true;
    if (registroGarantia) registroGarantia.hidden = false;
    if (valuacion) valuacion.hidden = false;
    if (factura && tipoDocumento) {
      factura.hidden = (tipoDocumento.value !== 'FACTURA');
    }
    if (testimonioNotarial && tipoDocumento) {
      testimonioNotarial.hidden = (tipoDocumento.value !== 'TESTIMONIO NOTARIAL');
    }
    if (actaPosesion && tipoDocumento) {
      actaPosesion.hidden = (tipoDocumento.value !== 'ACTA DE POSESIÓN');
    }
    if (reciboSimple && tipoDocumento) {
      reciboSimple.hidden = (tipoDocumento.value !== 'RECIBO SIMPLE');
    }
    if (constanciaPosesion && tipoDocumento) {
      constanciaPosesion.hidden = (tipoDocumento.value !== 'CONSTANCIA DE POSESIÓN');
    }

    // Asegurar que el botón del sidebar esté activo
    document.querySelectorAll('.stage-btn').forEach(b => {
      b.classList.remove('stage-active');
      if (b.textContent.trim() === 'Registro de Garantía y Otros') {
        b.classList.add('stage-active');
      }
    });
  };

  /* ---------------------------------------------------------
     13. LÓGICA PARA REGISTRO DE GARANTÍA Y OTROS
  --------------------------------------------------------- */
  // Catálogos de clasificación según tipo de garantía
  const CLASIFICACIONES = {
    MOBILIARIA: [
      'MAQUINARIA Y EQUIPO',
      'VEHÍCULOS TERRESTRES DE MOTOR',
      'PRODUCTOS MANUFACTURADOS DISTINTOS A MAQUINARIA',
      'TITULOS DE DEUDA EMITIDOS POR EL GOBIERNO FEDERAL',
      'TITULOS DE DEUDA EMITIDOS POR ENTIDADES DISTINTAS AL GF',
      'ACCIONES REPRESENTATIVAS DE CAPITAL',
      'DERECHOS, INCLUYENDO DERECHOS DE COBRO',
      'BIENES DE CONSUMO',
      'FIDEICOMISO',
      'OTROS'
    ],
    INMOBILIARIA: [
      'CASA HABITACION UNIFAMILIAR',
      'CONDOMINIO MULTIFAMILIAR',
      'UNIDAD INDUSTRIAL',
      'TERRENO EN ZONA RURAL',
      'TERRENO EN ZONA URBANA'
    ],
    GUBERNAMENTAL: [
      'GARANTIA FEGA',
      'GARANTIA FONAGA'
    ]
  };

  function inicializarRegistroGarantia() {
    const tipoGarantia = document.getElementById('tipoGarantia');
    const clasificacionGarantia = document.getElementById('clasificacionGarantia');
    const tipoDocumento = document.getElementById('tipoDocumento');
    const facturaCard = document.getElementById('factura');
    const testimonioNotarialCard = document.getElementById('testimonioNotarial');
    const actaPosesionCard = document.getElementById('actaPosesion');
    const reciboSimpleCard = document.getElementById('reciboSimple');
    const constanciaPosesionCard = document.getElementById('constanciaPosesion');

    if (!tipoGarantia || !clasificacionGarantia || !tipoDocumento) return;
    if (tipoGarantia.dataset.initialized === 'true') return;
    tipoGarantia.dataset.initialized = 'true';

    // 1. Actualizar Clasificación Garantía según Tipo Garantía
    function actualizarClasificacion() {
      const tipo = tipoGarantia.value;
      clasificacionGarantia.innerHTML = '';
      clasificacionGarantia.disabled = true;

      if (tipo && CLASIFICACIONES[tipo]) {
        const opciones = CLASIFICACIONES[tipo];
        const optDefault = document.createElement('option');
        optDefault.value = '';
        optDefault.textContent = 'SELECCIONAR';
        clasificacionGarantia.appendChild(optDefault);

        opciones.forEach(item => {
          const opt = document.createElement('option');
          opt.value = item;
          opt.textContent = item;
          clasificacionGarantia.appendChild(opt);
        });
        clasificacionGarantia.disabled = false;
      } else {
        const optDefault = document.createElement('option');
        optDefault.value = '';
        optDefault.textContent = 'SELECCIONAR';
        clasificacionGarantia.appendChild(optDefault);
        clasificacionGarantia.disabled = true;
      }
    }

    tipoGarantia.addEventListener('change', actualizarClasificacion);
    // Inicializar
    actualizarClasificacion();

    // 2. Mostrar/ocultar tarjeta Factura y Testimonio Notarial según Tipo de Documento
    function actualizarSeccionDocumento() {
      const tipo = tipoDocumento.value;
      if (facturaCard) {
        facturaCard.hidden = (tipo !== 'FACTURA');
      }
      if (testimonioNotarialCard) {
        testimonioNotarialCard.hidden = (tipo !== 'TESTIMONIO NOTARIAL');
      }
      if (actaPosesionCard) {
        actaPosesionCard.hidden = (tipo !== 'ACTA DE POSESIÓN');
      }
      if (reciboSimpleCard) {
        reciboSimpleCard.hidden = (tipo !== 'RECIBO SIMPLE');
      }
      if (constanciaPosesionCard) {
        constanciaPosesionCard.hidden = (tipo !== 'CONSTANCIA DE POSESIÓN');
      }
    }

    tipoDocumento.addEventListener('change', actualizarSeccionDocumento);
    // Inicializar
    actualizarSeccionDocumento();
  }

  // Inicializar al cargar la página
  inicializarRegistroGarantia();

  /* ---------------------------------------------------------
     14. Event listeners para los tabs superiores
  --------------------------------------------------------- */
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', function (e) {
      const tabText = this.textContent.trim();

      if (tabText === 'Dictamen') {
        window.mostrarDictamen();
      } else if (tabText === 'Dictamen Quash') {
        window.mostrarDictamenQuash();
      } else if (tabText === 'Acta de Comite') {
        window.menuActaComite();
      } else if (tabText === 'Carga de Documentos') {
        window.mostrarCargaDocumentos();
      } else if (tabText === 'Aplicación de Pagos') {
        window.mostrarAplicacionPagos();
      }
    });
  });

  // ... (Código anterior de la sección 14) ...
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', function (e) {
      // ...
    });
  });

  /* =========================================================================
       15. AUTO-COMPLETADO DE OBSERVACIONES EN TIEMPO REAL (SIN SALTOS DE LÍNEA)
    ========================================================================= */
  const observacionesTextArea = document.getElementById("observaciones");

  const camposObservacionesIds = [
    "tipoDocumento",
    "descripcionbien",
    "marca",
    "modelo",
    "color",
    "Nserie",
    "Nmotor",
    "folio",
    "nombrede",
    "expedidopor"
  ];

  function actualizarObservaciones() {
    let partes = [];

    camposObservacionesIds.forEach(id => {
      const elemento = document.getElementById(id);
      if (elemento) {
        let valor = elemento.value.trim();

        // Si es el selector de documento, extraemos el texto visible en vez del valor interno
        if (id === "tipoDocumento" && elemento.selectedIndex > 0) {
          valor = elemento.options[elemento.selectedIndex].text;
        }

        if (valor !== "") {
          const label = elemento.closest('.field')?.querySelector('label')?.textContent || id;
          const texto = id === "descripcionbien" ? valor : `${label}: ${valor}`;
          // Guardamos cada dato con un espacio al final
          partes.push(texto);
        }
      }
    });

    if (observacionesTextArea) {
      const texto = partes.join(", ");
      observacionesTextArea.value = texto ? `${texto}.` : "";
    }
  }

  // Escuchamos cambios en tiempo real para cada campo de la lista
  camposObservacionesIds.forEach(id => {
    const elemento = document.getElementById(id);
    if (elemento) {
      // 'input' asegura que se actualice letra por letra al escribir
      elemento.addEventListener("input", actualizarObservaciones);

      if (elemento.tagName === "SELECT") {
        elemento.addEventListener("change", actualizarObservaciones);
      }
    }
  });
  /* ========================================================================= */

  window.mostrarDictamen();

});
