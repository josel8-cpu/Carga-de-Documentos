// ============================================================
// C-MOVIL · Etapa de Decisiones · Firmas de Autorización
// ============================================================

document.addEventListener('DOMContentLoaded', function () {

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
        } else {
            listaSuplentes.forEach(function (nombre) {
                const opt = document.createElement('option');
                opt.value = nombre;
                opt.textContent = nombre;
                selectNombre.appendChild(opt);
            });
        }
        selectNombre.disabled = false;
    }

    var presidenteTipo = document.getElementById('presidenteTipo');
    var presidenteNombre = document.getElementById('presidenteNombre');
    if (presidenteTipo && presidenteNombre) {
        poblarNombres(presidenteNombre, presidenteTipo.value, TITULAR_PRESIDENTE, SUPLENTES_PRESIDENTE);
        presidenteTipo.addEventListener('change', function () {
            poblarNombres(presidenteNombre, this.value, TITULAR_PRESIDENTE, SUPLENTES_PRESIDENTE);
        });
    }

    var secretariaTipo = document.getElementById('secretariaTipo');
    var secretariaNombre = document.getElementById('secretariaNombre');
    if (secretariaTipo && secretariaNombre) {
        poblarNombres(secretariaNombre, secretariaTipo.value, TITULAR_SECRETARIA, SUPLENTES_SECRETARIA);
        secretariaTipo.addEventListener('change', function () {
            poblarNombres(secretariaNombre, this.value, TITULAR_SECRETARIA, SUPLENTES_SECRETARIA);
        });
    }

    var chkFirmaEspecial = document.getElementById('requiereFirmaEspecial');
    var chkFirmaExtraordinaria = document.getElementById('requiereFirmaExtraordinaria');
    var wrapperFirmaEspecial = document.getElementById('wrapperFirmaEspecial');
    var wrapperFirmaExtraordinaria = document.getElementById('wrapperFirmaExtraordinaria');
    var wrapperFirmaVacio = document.getElementById('wrapperFirmaVacio');
    var firmaExtraordinaria = document.getElementById('firmaExtraordinaria');

    function actualizarVisibilidadFirmas() {
        var mostrarEspecial = chkFirmaEspecial ? chkFirmaEspecial.checked : false;
        var mostrarExtraordinaria = chkFirmaExtraordinaria ? chkFirmaExtraordinaria.checked : false;
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
        chkFirmaEspecial.addEventListener('change', function () {
            actualizarVisibilidadFirmas();
            marcarUltimaModificacion();
        });
    }
    if (chkFirmaExtraordinaria) {
        chkFirmaExtraordinaria.addEventListener('change', function () {
            actualizarVisibilidadFirmas();
            marcarUltimaModificacion();
        });
    }

    /* ---------------------------------------------------------
       2. Fechas automáticas
    --------------------------------------------------------- */
    var autorizacionSelect = document.getElementById('autorizacion');
    var fechaAprobacionInput = document.getElementById('fechaAprobacion');
    var fechaResolucionInput = document.getElementById('fechaResolucion');
    var ultimaModificacionInput = document.getElementById('ultimaModificacion');

    function formatearFecha(date) {
        var opciones = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
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
    var PLANTILLAS_RESOLUCION = {
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
        var btnDocumentos = document.getElementById('btnDocumentosCliente');
        var btnCaratula = document.getElementById('btnCaratulaComite');
        if (btnDocumentos && btnCaratula) {
            btnDocumentos.style.display = mostrar ? 'inline-flex' : 'none';
            btnCaratula.style.display = mostrar ? 'inline-flex' : 'none';
        }
    }

    /* ---------------------------------------------------------
       4. Funciones de navegación de tabs
    --------------------------------------------------------- */
    window.menuActaComite = function () {
        actualizarBotonesSolventacion(true);
        var tabs = document.querySelectorAll('.tab');
        tabs.forEach(function (tab) {
            var tabText = tab.textContent.trim();
            if (tabText === 'Dictamen' || tabText === 'Dictamen Quash' || tabText === 'Acta de Comite') {
                tab.hidden = false;
            }
        });
        var firmas = document.getElementById('firmas');
        var dictamen = document.getElementById('dictamen');
        var dictamenQuash = document.getElementById('dictamenQuash');
        var historial = document.getElementById('historial');
        var tipoActa = document.getElementById('tipoActa');
        var generarActa = document.getElementById('generarActa');
        var cargaDocumentos = document.getElementById('cargaDocumentos');
        var aplicacionPagos = document.getElementById('aplicacionPagos');
        var registroGarantia = document.getElementById('registroGarantia');
        var valuacion = document.getElementById('valuacion');
        var factura = document.getElementById('factura');
        var testimonioNotarial = document.getElementById('testimonioNotarial');
        var actaPosesion = document.getElementById('actaPosesion');
        var reciboSimple = document.getElementById('reciboSimple');
        var constanciaPosesion = document.getElementById('constanciaPosesion');
        var solicitudLiberacion = document.getElementById('solicitudLiberacion');
        var liberaciones = document.getElementById('liberaciones');
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
        if (solicitudLiberacion) solicitudLiberacion.hidden = true;
        if (liberaciones) liberaciones.hidden = true;
        if (firmas) firmas.hidden = false;
        if (tipoActa) tipoActa.hidden = false;
        if (generarActa) generarActa.hidden = false;
        document.querySelectorAll('.tab').forEach(function (t) { t.classList.remove('active'); });
        var actaTab = document.querySelector('.tab[data-tab="receptora"]');
        if (actaTab) actaTab.classList.add('active');
    };

    window.mostrarDictamen = function () {
        actualizarBotonesSolventacion(true);
        var tabs = document.querySelectorAll('.tab');
        tabs.forEach(function (tab) {
            var tabText = tab.textContent.trim();
            if (tabText === 'Dictamen' || tabText === 'Dictamen Quash' || tabText === 'Acta de Comite') {
                tab.hidden = false;
            }
        });
        var firmas = document.getElementById('firmas');
        var dictamen = document.getElementById('dictamen');
        var dictamenQuash = document.getElementById('dictamenQuash');
        var historial = document.getElementById('historial');
        var tipoActa = document.getElementById('tipoActa');
        var generarActa = document.getElementById('generarActa');
        var cargaDocumentos = document.getElementById('cargaDocumentos');
        var aplicacionPagos = document.getElementById('aplicacionPagos');
        var registroGarantia = document.getElementById('registroGarantia');
        var valuacion = document.getElementById('valuacion');
        var factura = document.getElementById('factura');
        var testimonioNotarial = document.getElementById('testimonioNotarial');
        var actaPosesion = document.getElementById('actaPosesion');
        var reciboSimple = document.getElementById('reciboSimple');
        var constanciaPosesion = document.getElementById('constanciaPosesion');
        var solicitudLiberacion = document.getElementById('solicitudLiberacion');
        var liberaciones = document.getElementById('liberaciones');
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
        if (solicitudLiberacion) solicitudLiberacion.hidden = true;
        if (liberaciones) liberaciones.hidden = true;
        if (firmas) firmas.hidden = false;
        document.querySelectorAll('.tab').forEach(function (t) { t.classList.remove('active'); });
        var dictamenTab = document.querySelector('.tab[data-tab="dictamen"]');
        if (dictamenTab) dictamenTab.classList.add('active');
        var dictamenHeader = document.querySelector('#dictamen .card-header h2');
        if (dictamenHeader) dictamenHeader.textContent = 'Resolución de Comité de Crédito';
    };

    window.mostrarDictamenQuash = function () {
        actualizarBotonesSolventacion(true);
        var tabs = document.querySelectorAll('.tab');
        tabs.forEach(function (tab) {
            var tabText = tab.textContent.trim();
            if (tabText === 'Dictamen' || tabText === 'Dictamen Quash' || tabText === 'Acta de Comite') {
                tab.hidden = false;
            }
        });
        var firmas = document.getElementById('firmas');
        var dictamen = document.getElementById('dictamen');
        var dictamenQuash = document.getElementById('dictamenQuash');
        var historial = document.getElementById('historial');
        var tipoActa = document.getElementById('tipoActa');
        var generarActa = document.getElementById('generarActa');
        var cargaDocumentos = document.getElementById('cargaDocumentos');
        var aplicacionPagos = document.getElementById('aplicacionPagos');
        var registroGarantia = document.getElementById('registroGarantia');
        var valuacion = document.getElementById('valuacion');
        var factura = document.getElementById('factura');
        var testimonioNotarial = document.getElementById('testimonioNotarial');
        var actaPosesion = document.getElementById('actaPosesion');
        var reciboSimple = document.getElementById('reciboSimple');
        var constanciaPosesion = document.getElementById('constanciaPosesion');
        var solicitudLiberacion = document.getElementById('solicitudLiberacion');
        var liberaciones = document.getElementById('liberaciones');
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
        if (solicitudLiberacion) solicitudLiberacion.hidden = true;
        if (liberaciones) liberaciones.hidden = true;
        if (firmas) firmas.hidden = true;
        document.querySelectorAll('.tab').forEach(function (t) { t.classList.remove('active'); });
        var quashTab = document.querySelector('.tab[data-tab="dictamen-quash"]');
        if (quashTab) quashTab.classList.add('active');
        actualizarDatosQuash();
    };

    function actualizarDatosQuash() {
        var quashData = {
            resultado: 'AUTORIZADO',
            score: '69%',
            observaciones: 'No aplica',
            edad: 'No aplica',
            sexo: 'Agregar pareja como co acreditado',
            estadoCivil: 'Validar criterio estado civil femenino',
            actividadEconomica: 'No aplica',
            consultaHC: 'No aplica'
        };
        var resultadoEl = document.getElementById('quashResultado');
        if (resultadoEl) {
            resultadoEl.textContent = quashData.resultado;
            resultadoEl.className = 'quash-value';
            if (quashData.resultado === 'AUTORIZADO') resultadoEl.classList.add('quash-autorizado');
            else if (quashData.resultado === 'OBSERVADO') resultadoEl.classList.add('quash-observado');
            else if (quashData.resultado === 'RECHAZADO') resultadoEl.classList.add('quash-rechazado');
        }
        var scoreEl = document.getElementById('quashScore');
        if (scoreEl) scoreEl.textContent = quashData.score;
        var observacionesEl = document.getElementById('quashObservaciones');
        if (observacionesEl) observacionesEl.textContent = quashData.observaciones;
        var edadEl = document.getElementById('quashEdad');
        if (edadEl) edadEl.textContent = quashData.edad;
        var sexoEl = document.getElementById('quashSexo');
        if (sexoEl) sexoEl.textContent = quashData.sexo;
        var estadoCivilEl = document.getElementById('quashEstadoCivil');
        if (estadoCivilEl) estadoCivilEl.textContent = quashData.estadoCivil;
        var actividadEl = document.getElementById('quashActividadEconomica');
        if (actividadEl) actividadEl.textContent = quashData.actividadEconomica;
        var consultaEl = document.getElementById('quashConsultaHC');
        if (consultaEl) consultaEl.textContent = quashData.consultaHC;
    }

    /* ---------------------------------------------------------
       5. Funcionalidad de resolución
    --------------------------------------------------------- */
    var wrapperResolucionPredefinida = document.getElementById('wrapperResolucionPredefinida');
    var resolucionPredefinidaSelect = document.getElementById('resolucionPredefinida');
    var resolucionComiteTextarea = document.getElementById('resolucionComite');
    var btnLimpiarResolucion = document.getElementById('btnLimpiarResolucion');
    if (btnLimpiarResolucion) {
        btnLimpiarResolucion.addEventListener('click', function () {
            if (resolucionComiteTextarea && resolucionComiteTextarea.value.trim() !== '') {
                if (confirm('¿Estás seguro de que quieres limpiar el texto de la resolución?')) {
                    resolucionComiteTextarea.value = '';
                    marcarUltimaModificacion();
                }
            }
        });
    }

    function actualizarDesplegablePredefinido() {
        var estado = autorizacionSelect ? autorizacionSelect.value : '';
        if (resolucionPredefinidaSelect) resolucionPredefinidaSelect.innerHTML = '';
        if (estado && PLANTILLAS_RESOLUCION[estado] && resolucionPredefinidaSelect) {
            var optDefault = document.createElement('option');
            optDefault.value = "";
            optDefault.textContent = "Ninguna (Entrada manual) / Seleccione una plantilla...";
            resolucionPredefinidaSelect.appendChild(optDefault);
            PLANTILLAS_RESOLUCION[estado].forEach(function (item, index) {
                var opt = document.createElement('option');
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
        autorizacionSelect.addEventListener('change', function () {
            var estado = this.value;
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
        resolucionPredefinidaSelect.addEventListener('change', function () {
            var estado = autorizacionSelect ? autorizacionSelect.value : '';
            var indexSelected = this.value;
            if (estado && indexSelected !== "" && PLANTILLAS_RESOLUCION[estado] && PLANTILLAS_RESOLUCION[estado][indexSelected]) {
                var currentText = resolucionComiteTextarea ? resolucionComiteTextarea.value.trim() : '';
                var newText = PLANTILLAS_RESOLUCION[estado][indexSelected].texto;
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

    var camposDictamenIds = ['montoAprobado', 'plazo', 'tasa', 'nivelRiesgo', 'resolucionComite', 'periodicidad'];
    camposDictamenIds.forEach(function (id) {
        var campo = document.getElementById(id);
        if (campo) {
            campo.addEventListener('input', marcarUltimaModificacion);
            campo.addEventListener('change', marcarUltimaModificacion);
        }
    });

    [presidenteTipo, presidenteNombre, secretariaTipo, secretariaNombre, firmaExtraordinaria].forEach(function (campo) {
        if (campo) {
            campo.addEventListener('change', marcarUltimaModificacion);
        }
    });

    var btnGuardar = document.getElementById('guardarResolucion');
    if (btnGuardar) {
        btnGuardar.addEventListener('click', function () {
            marcarUltimaModificacion();
            var textoOriginal = this.textContent;
            this.textContent = '✓ Resolución Guardada';
            this.classList.add('saved');
            setTimeout(function () {
                btnGuardar.textContent = textoOriginal;
                btnGuardar.classList.remove('saved');
            }, 1800);
        });
    }

    /* ---------------------------------------------------------
       6. Historial de Créditos
    --------------------------------------------------------- */
    var HC_DATOS = [
        { otorgante: 'BANCOS', tipo: 'PP', saldoActual: 0, saldoVencido: 0, pagoActual: 'V', ultimoPago: '2018-06-06', frecuencia: 'Semanal', monto: 0 },
        { otorgante: 'BANCOS', tipo: 'PP', saldoActual: 0, saldoVencido: 0, pagoActual: 'V', ultimoPago: '2018-09-28', frecuencia: 'Semanal', monto: 0 },
        { otorgante: 'ASEFIMEX', tipo: 'PP', saldoActual: 16286, saldoVencido: 0, pagoActual: 'V', ultimoPago: '2026-05-28', frecuencia: 'Pago Mínimo Revolvente', monto: 2975 }
    ];

    function formatMXN(v) {
        return '$' + v.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }

    function renderHistorialCreditos() {
        var tbody = document.getElementById('hcTableBody');
        if (!tbody) return;
        tbody.innerHTML = '';
        HC_DATOS.forEach(function (row) {
            var tr = document.createElement('tr');
            tr.innerHTML = '\
                        <td>' + row.otorgante + '</td>\
                        <td>' + row.tipo + '</td>\
                        <td>' + formatMXN(row.saldoActual) + '</td>\
                        <td>' + formatMXN(row.saldoVencido) + '</td>\
                        <td>' + row.pagoActual + '</td>\
                        <td>' + row.ultimoPago + '</td>\
                        <td>' + row.frecuencia + '</td>\
                        <td>' + formatMXN(row.monto) + '</td>\
                    ';
            tbody.appendChild(tr);
        });
        var totalSaldoActual = HC_DATOS.reduce(function (s, r) { return s + r.saldoActual; }, 0);
        var totalSaldoVencido = HC_DATOS.reduce(function (s, r) { return s + r.saldoVencido; }, 0);
        var totalActual = document.getElementById('hcTotalSaldoActual');
        var totalVencido = document.getElementById('hcTotalSaldoVencido');
        if (totalActual) totalActual.textContent = formatMXN(totalSaldoActual);
        if (totalVencido) totalVencido.textContent = formatMXN(totalSaldoVencido);
        var freqMap = {};
        HC_DATOS.forEach(function (r) {
            freqMap[r.frecuencia] = (freqMap[r.frecuencia] || 0) + r.monto;
        });
        var freqList = document.getElementById('hcFreqList');
        if (!freqList) return;
        freqList.innerHTML = '';
        Object.entries(freqMap).forEach(function (_ref) {
            var frec = _ref[0],
                total = _ref[1];
            var div = document.createElement('div');
            div.className = 'hc-freq-row';
            div.innerHTML = '<span>' + frec + '</span><span>' + formatMXN(total) + '</span>';
            freqList.appendChild(div);
        });
    }
    renderHistorialCreditos();

    /* ---------------------------------------------------------
       7. CARGA DE DOCUMENTOS - VISTA Y FUNCIONALIDAD
    --------------------------------------------------------- */
    var DOCUMENTOS_DATA = [
        { id: 1, nombre: 'Identificación Oficial*', archivo: '', comentario: '' },
        { id: 2, nombre: 'CURP*', archivo: '', comentario: '' },
        { id: 3, nombre: 'RFC*', archivo: '', comentario: '' },
        { id: 4, nombre: 'Acta de Nacimiento', archivo: '', comentario: '' },
        { id: 5, nombre: 'Comprobante de Domicilio*', archivo: '', comentario: '' },
        { id: 6, nombre: 'Permiso de Circulación', archivo: '', comentario: '' },
        { id: 7, nombre: 'Autorizacion para Consulta en Sociedades Crediticias', archivo: '', comentario: '' },
        { id: 8, nombre: 'Reporte de Circulo de Crédito Cliente*', archivo: '', comentario: '' },
        { id: 9, nombre: 'Reporte Fotografico y visita domiciliar*', archivo: '', comentario: '' },
        { id: 10, nombre: 'Estado de Cuenta ASEFIMEX', archivo: '', comentario: '' }
    ];

    function renderCargaDocumentos() {
        var tbody = document.getElementById('docTableBody');
        if (!tbody) return;
        tbody.innerHTML = '';
        DOCUMENTOS_DATA.forEach(function (doc) {
            var tr = document.createElement('tr');
            var fileId = 'file_' + doc.id;
            tr.innerHTML = '\
                        <td style="text-align: left;"><strong>' + doc.nombre + '</strong></td>\
                        <td style="text-align: left;">\
                            <span class="file-name" id="fileName_' + doc.id + '">' + (doc.archivo || 'Ningún archivo seleccionado') + '</span>\
                        </td>\
                        <td style="text-align: center;">\
                            <button class="btn-icon" onclick="verDocumento(' + doc.id + ')" title="Ver documento">👁️</button>\
                        </td>\
                        <td style="text-align: center;">\
                            <label class="file-label" for="' + fileId + '">\
                                Subir\
                                <input type="file" id="' + fileId + '" onchange="subirDocumento(' + doc.id + ', this)">\
                            </label>\
                        </td>\
                        <td style="text-align: left;">\
                            <input type="text" class="doc-comment" id="comment_' + doc.id + '" placeholder="Agregar comentario..." value="' + (doc.comentario || '') + '" onchange="guardarComentario(' + doc.id + ', this.value)">\
                        </td>\
                    ';
            tbody.appendChild(tr);
        });
    }

    function renderCargaDocumentosAval() {
        var tbody = document.getElementById('docTableBodyAval');
        if (!tbody) return;
        tbody.innerHTML = '';
        var DOCUMENTOS_DATA_AVAL = [
            { id: 1, nombre: 'Identificación Oficial Aval', archivo: '', comentario: '' },
            { id: 2, nombre: 'CURP Aval', archivo: '', comentario: '' },
            { id: 3, nombre: 'RFC Aval', archivo: '', comentario: '' },
            { id: 4, nombre: 'Acta de Nacimiento Aval', archivo: '', comentario: '' },
            { id: 5, nombre: 'Comprobante de Domicilio Aval', archivo: '', comentario: '' },
            { id: 7, nombre: 'Autorizacion para Consulta en Sociedades Crediticias Aval', archivo: '', comentario: '' },
            { id: 8, nombre: 'Reporte de Circulo de Crédito Cliente Aval', archivo: '', comentario: '' }
        ];
        DOCUMENTOS_DATA_AVAL.forEach(function (doc) {
            var tr = document.createElement('tr');
            var fileId = 'file_' + doc.id;
            tr.innerHTML = '\
                        <td style="text-align: left;"><strong>' + doc.nombre + '</strong></td>\
                        <td style="text-align: left;">\
                            <span class="file-name" id="fileName_' + doc.id + '">' + (doc.archivo || 'Ningún archivo seleccionado') + '</span>\
                        </td>\
                        <td style="text-align: center;">\
                            <button class="btn-icon" onclick="verDocumento(' + doc.id + ')" title="Ver documento">👁️</button>\
                        </td>\
                        <td style="text-align: center;">\
                            <label class="file-label" for="' + fileId + '">\
                                Subir\
                                <input type="file" id="' + fileId + '" onchange="subirDocumento(' + doc.id + ', this)">\
                            </label>\
                        </td>\
                        <td style="text-align: left;">\
                            <input type="text" class="doc-comment" id="comment_' + doc.id + '" placeholder="Agregar comentario..." value="' + (doc.comentario || '') + '" onchange="guardarComentario(' + doc.id + ', this.value)">\
                        </td>\
                    ';
            tbody.appendChild(tr);
        });
    }

    var DOCUMENTOS_DATA_SEGUNDO_AVAL = [
        { id: 1, nombre: 'Identificación Oficial Segundo Aval', archivo: '', comentario: '' },
        { id: 2, nombre: 'CURP Segundo Aval', archivo: '', comentario: '' },
        { id: 3, nombre: 'RFC Segundo Aval', archivo: '', comentario: '' },
        { id: 4, nombre: 'Acta de Nacimiento Segundo Aval', archivo: '', comentario: '' },
        { id: 5, nombre: 'Comprobante de Domicilio Segundo Aval', archivo: '', comentario: '' },
        { id: 7, nombre: 'Autorizacion para Consulta en Sociedades Crediticias Segundo Aval', archivo: '', comentario: '' },
        { id: 8, nombre: 'Reporte de Circulo de Crédito Cliente Segundo Aval', archivo: '', comentario: '' }
    ];

    function renderCargaDocumentosSegundoAval() {
        var tbody = document.getElementById('docTableBodySegundoAval');
        if (!tbody) return;
        tbody.innerHTML = '';
        DOCUMENTOS_DATA_SEGUNDO_AVAL.forEach(function (doc) {
            var tr = document.createElement('tr');
            var fileId = 'file_' + doc.id;
            tr.innerHTML = '\
                        <td style="text-align: left;"><strong>' + doc.nombre + '</strong></td>\
                        <td style="text-align: left;">\
                            <span class="file-name" id="fileName_' + doc.id + '">' + (doc.archivo || 'Ningún archivo seleccionado') + '</span>\
                        </td>\
                        <td style="text-align: center;">\
                            <button class="btn-icon" onclick="verDocumento(' + doc.id + ')" title="Ver documento">👁️</button>\
                        </td>\
                        <td style="text-align: center;">\
                            <label class="file-label" for="' + fileId + '">\
                                Subir\
                                <input type="file" id="' + fileId + '" onchange="subirDocumento(' + doc.id + ', this)">\
                            </label>\
                        </td>\
                        <td style="text-align: left;">\
                            <input type="text" class="doc-comment" id="comment_' + doc.id + '" placeholder="Agregar comentario..." value="' + (doc.comentario || '') + '" onchange="guardarComentario(' + doc.id + ', this.value)">\
                        </td>\
                    ';
            tbody.appendChild(tr);
        });
    }

    var DOCUMENTOS_DATA_ADICIONALES = [
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
        var tbody = document.getElementById('docTableBodyAdicionales');
        if (!tbody) return;
        tbody.innerHTML = '';
        DOCUMENTOS_DATA_ADICIONALES.forEach(function (doc) {
            var tr = document.createElement('tr');
            var fileId = 'file_' + doc.id;
            tr.innerHTML = '\
                        <td style="text-align: left;"><strong>' + doc.nombre + '</strong></td>\
                        <td style="text-align: left;">\
                            <span class="file-name" id="fileName_' + doc.id + '">' + (doc.archivo || 'Ningún archivo seleccionado') + '</span>\
                        </td>\
                        <td style="text-align: center;">\
                            <button class="btn-icon" onclick="verDocumento(' + doc.id + ')" title="Ver documento">👁️</button>\
                        </td>\
                        <td style="text-align: center;">\
                            <label class="file-label" for="' + fileId + '">\
                                Subir\
                                <input type="file" id="' + fileId + '" onchange="subirDocumento(' + doc.id + ', this)">\
                            </label>\
                        </td>\
                        <td style="text-align: left;">\
                            <input type="text" class="doc-comment" id="comment_' + doc.id + '" placeholder="Agregar comentario..." value="' + (doc.comentario || '') + '" onchange="guardarComentario(' + doc.id + ', this.value)">\
                        </td>\
                    ';
            tbody.appendChild(tr);
        });
    }

    window.subirDocumento = function (id, input) {
        var file = input.files[0];
        if (file) {
            var doc = DOCUMENTOS_DATA.find(function (d) { return d.id === id; });
            if (doc) {
                doc.archivo = file.name;
                var fileNameSpan = document.getElementById('fileName_' + id);
                if (fileNameSpan) {
                    fileNameSpan.textContent = file.name;
                }
                var label = input.closest('.file-label');
                if (label) {
                    label.classList.add('selected');
                    label.innerHTML = '✅ ' + file.name.substring(0, 15) + (file.name.length > 15 ? '...' : '');
                    var newInput = document.createElement('input');
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
        var doc = DOCUMENTOS_DATA.find(function (d) { return d.id === id; });
        if (doc && doc.archivo) {
            alert('Ver documento: ' + doc.archivo + '\n(En una implementación real, aquí se abriría la vista previa del archivo)');
        } else {
            alert('No hay archivo subido para este documento.');
        }
    };

    window.guardarComentario = function (id, valor) {
        var doc = DOCUMENTOS_DATA.find(function (d) { return d.id === id; });
        if (doc) {
            doc.comentario = valor;
            marcarUltimaModificacion();
        }
    };

    renderCargaDocumentos();
    renderCargaDocumentosAval();
    renderCargaDocumentosSegundoAval();
    renderCargaDocumentosAdicionales();

    /* ---------------------------------------------------------
       8. APLICACIÓN DE PAGOS - VISTA Y FUNCIONALIDAD
    --------------------------------------------------------- */
    var PAGOS_DATA = [
        { id: 1, nombre: 'Enganche', archivo: '', comentario: '', aplicacion: '', estado: '', estatus: 'pendiente' },
        { id: 2, nombre: 'Garantía Líquida', archivo: '', comentario: '', aplicacion: '', estado: '', estatus: 'pendiente' },
        { id: 3, nombre: 'Comisión por Apertura', archivo: '', comentario: '', aplicacion: '', estado: '', estatus: 'pendiente' },
        { id: 4, nombre: 'Co Financiamiento', archivo: '', comentario: '', aplicacion: '', estado: '', estatus: 'pendiente' },
        { id: 5, nombre: 'Complemento de Enganche', archivo: '', comentario: '', aplicacion: '', estado: '', estatus: 'pendiente' },
        { id: 6, nombre: 'Enganche GPS', archivo: '', comentario: '', aplicacion: '', estado: '', estatus: 'pendiente' },
        { id: 7, nombre: 'Garantia Liquida Enganche Diferido', archivo: '', comentario: '', aplicacion: '', estado: '', estatus: 'pendiente' }
    ];

    var pagoActualId = null;
    var pagoCancelarId = null;

    function renderAplicacionPagos() {
        var tbody = document.getElementById('pagosTableBody');
        if (!tbody) return;
        tbody.innerHTML = '';
        PAGOS_DATA.forEach(function (pago) {
            var tr = document.createElement('tr');
            var estaAplicado = pago.aplicacion && pago.aplicacion !== '' && pago.estado !== 'cancelado';
            var estaCancelado = pago.estado === 'cancelado';
            var estatusClass = '';
            if (pago.estatus === 'pendiente') estatusClass = 'estatus-pendiente';
            else if (pago.estatus === 'aplicado') estatusClass = 'estatus-aplicado';
            else if (pago.estatus === 'cancelado') estatusClass = 'estatus-cancelado';
            else if (pago.estatus === 'revision') estatusClass = 'estatus-revision';
            tr.innerHTML = '\
                        <td style="text-align: left;"><strong>' + pago.nombre + '</strong></td>\
                        <td style="text-align: left;">\
                            <span class="file-name" id="pagoFileName_' + pago.id + '">' + (pago.archivo || 'Ningún archivo seleccionado') + '</span>\
                        </td>\
                        <td style="text-align: center;">\
                            <button class="btn-icon" onclick="verPago(' + pago.id + ')" title="Ver documento">👁️</button>\
                        </td>\
                        <td style="text-align: left;">\
                            <input type="text" class="doc-comment" id="pagoComment_' + pago.id + '" placeholder="Agregar comentario..." value="' + (pago.comentario || '') + '" onchange="guardarPagoComentario(' + pago.id + ', this.value)">\
                        </td>\
                        <td style="text-align: center;">\
                            <div class="acciones-pago">\
                                <button class="btn-aplicar-pago ' + (estaAplicado ? 'aplicado' : '') + (estaCancelado ? ' cancelado' : '') + '" onclick="abrirModalAplicarPago(' + pago.id + ')">\
                                    ' + (estaCancelado ? '⛔ Cancelado' : (estaAplicado ? '✓ Aplicado' : 'Aplicar Pago')) + '\
                                </button>\
                            </div>\
                        </td>\
                        <td style="text-align: center;">\
                            <div class="acciones-pago">\
                                <button class="btn-cancelar-pago ' + (estaCancelado ? 'cancelado' : '') + '" onclick="abrirModalCancelarPago(' + pago.id + ')">\
                                    ' + (estaCancelado ? '✓ Cancelado' : 'Cancelar Pago') + '\
                                </button>\
                            </div>\
                        </td>\
                        <td style="text-align: center;">\
                            <select class="select-estatus ' + estatusClass + '" id="estatus_' + pago.id + '" onchange="cambiarEstatus(' + pago.id + ', this.value)">\
                                <option value="pendiente" ' + (pago.estatus === 'pendiente' ? 'selected' : '') + '>Pendiente</option>\
                                <option value="aplicado" ' + (pago.estatus === 'aplicado' ? 'selected' : '') + '>Aplicado</option>\
                                <option value="cancelado" ' + (pago.estatus === 'cancelado' ? 'selected' : '') + '>Cancelado</option>\
                                <option value="revision" ' + (pago.estatus === 'revision' ? 'selected' : '') + '>En Revisión</option>\
                            </select>\
                        </td>\
                    ';
            tbody.appendChild(tr);
        });
    }

    window.cambiarEstatus = function (id, nuevoEstatus) {
        var pago = PAGOS_DATA.find(function (p) { return p.id === id; });
        if (pago) {
            pago.estatus = nuevoEstatus;
            marcarUltimaModificacion();
            var select = document.getElementById('estatus_' + id);
            if (select) {
                select.className = 'select-estatus';
                if (nuevoEstatus === 'pendiente') select.classList.add('estatus-pendiente');
                else if (nuevoEstatus === 'aplicado') select.classList.add('estatus-aplicado');
                else if (nuevoEstatus === 'cancelado') select.classList.add('estatus-cancelado');
                else if (nuevoEstatus === 'revision') select.classList.add('estatus-revision');
            }
            if (!window._actualizandoEstatus) {
                var estatusTexto = { 'pendiente': 'Pendiente', 'aplicado': 'Aplicado', 'cancelado': 'Cancelado', 'revision': 'En Revisión' };
                alert('Estatus del documento "' + pago.nombre + '" actualizado a: ' + estatusTexto[nuevoEstatus]);
            }
        }
    };

    window.verPago = function (id) {
        var pago = PAGOS_DATA.find(function (p) { return p.id === id; });
        if (pago && pago.archivo) {
            alert('Ver documento: ' + pago.archivo + '\n(En una implementación real, aquí se abriría la vista previa del archivo)');
        } else {
            alert('No hay archivo subido para este documento.');
        }
    };

    window.guardarPagoDocumento = function (id) {
        var pago = PAGOS_DATA.find(function (p) { return p.id === id; });
        if (pago && pago.archivo) {
            alert('Documento "' + pago.nombre + '" guardado exitosamente.\nArchivo: ' + pago.archivo);
            marcarUltimaModificacion();
        } else {
            alert('No hay archivo para guardar. Por favor sube un archivo primero.');
        }
    };

    window.guardarPagoComentario = function (id, valor) {
        var pago = PAGOS_DATA.find(function (p) { return p.id === id; });
        if (pago) {
            pago.comentario = valor;
            marcarUltimaModificacion();
        }
    };

    window.guardarPagos = function () {
        var resumen = 'Resumen de Pagos:\n\n';
        PAGOS_DATA.forEach(function (p) {
            var estatusTexto = { 'pendiente': 'Pendiente', 'aplicado': 'Aplicado', 'cancelado': 'Cancelado', 'revision': 'En Revisión' };
            resumen += p.nombre + ': ' + (estatusTexto[p.estatus] || p.estatus) + '\n';
        });
        alert('Pagos guardados exitosamente.\n\n' + resumen);
    };

    /* ---------------------------------------------------------
       8.1 FORMATO DE MONEDA PARA EL CAMPO DE MONTO
    --------------------------------------------------------- */
    function formatearMoneda(valor) {
        var limpio = valor.replace(/[^0-9.]/g, '');
        if (limpio === '' || limpio === '.') return '';
        var partes = limpio.split('.');
        var entero = partes[0];
        var decimal = partes[1] || '';
        if (decimal.length > 2) {
            decimal = decimal.substring(0, 2);
        }
        var enteroFormateado = entero.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        if (decimal) {
            return enteroFormateado + '.' + decimal;
        } else {
            return enteroFormateado;
        }
    }

    function inicializarCampoMoneda() {
        var montoInput = document.getElementById('montoAplicado');
        if (!montoInput) return;
        montoInput.addEventListener('input', function (e) {
            var valor = this.value;
            var posicion = this.selectionStart;
            var formateado = formatearMoneda(valor);
            if (formateado !== valor) {
                this.value = formateado;
                var nuevaPosicion = posicion;
                if (formateado.length > valor.length) {
                    nuevaPosicion = posicion + (formateado.length - valor.length);
                } else if (formateado.length < valor.length) {
                    nuevaPosicion = posicion - (valor.length - formateado.length);
                }
                this.setSelectionRange(nuevaPosicion, nuevaPosicion);
            }
        });
        montoInput.addEventListener('blur', function () {
            var valor = this.value.replace(/,/g, '');
            var numerico = parseFloat(valor);
            if (!isNaN(numerico) && numerico > 0) {
                if (!valor.includes('.')) {
                    this.value = formatearMoneda(valor + '.00');
                } else {
                    var partes = valor.split('.');
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
       8.2 MODAL APLICACIÓN DE PAGOS (con nueva lógica)
    --------------------------------------------------------- */
    window.abrirModalAplicarPago = function (id) {
        var pago = PAGOS_DATA.find(function (p) { return p.id === id; });
        if (!pago) return;
        pagoActualId = id;
        var modal = document.getElementById('modalAplicarPago');
        var docName = document.getElementById('modalDocName');
        if (docName) {
            docName.innerHTML = 'Documento: <strong>' + pago.nombre + '</strong>';
        }
        var radios = document.querySelectorAll('input[name="pregunta1"]');
        radios.forEach(function (r) { r.checked = false; });
        var montoInput = document.getElementById('montoAplicado');
        if (montoInput) {
            montoInput.value = '';
            inicializarCampoMoneda();
        }
        var fechaInput = document.getElementById('fechaAplicacion');
        if (fechaInput) {
            var hoy = new Date().toISOString().split('T')[0];
            fechaInput.value = hoy;
        }
        var fechaOperacion = document.getElementById('fechaOperacion');
        if (fechaOperacion) {
            var hoy2 = new Date().toISOString().split('T')[0];
            fechaOperacion.value = hoy2;
        }
        var formaPago = document.getElementById('formaPago');
        if (formaPago) formaPago.value = '';
        // Ocultar campos de transferencia al abrir
        var divTransfer = document.getElementById('preguntasTransferencia');
        if (divTransfer) divTransfer.style.display = 'none';
        // Limpiar campos de transferencia
        document.getElementById('bancoOrigen').value = '';
        document.getElementById('cuentaOrigen').value = '';
        document.getElementById('titularCuentaOrigen').value = '';

        var comentarios = document.getElementById('comentariosPago');
        if (comentarios) comentarios.value = '';
        if (modal) modal.style.display = 'flex';
    };

    window.cerrarModalAplicarPago = function () {
        var modal = document.getElementById('modalAplicarPago');
        if (modal) modal.style.display = 'none';
        pagoActualId = null;
        // Limpiar campos de transferencia y ocultar
        var divTransfer = document.getElementById('preguntasTransferencia');
        if (divTransfer) divTransfer.style.display = 'none';
        document.getElementById('bancoOrigen').value = '';
        document.getElementById('cuentaOrigen').value = '';
        document.getElementById('titularCuentaOrigen').value = '';
        var formaPago = document.getElementById('formaPago');
        if (formaPago) formaPago.value = '';
    };

    /* ---- Listener para mostrar/ocultar preguntas de transferencia ---- */
    var formaPagoSelect = document.getElementById('formaPago');
    if (formaPagoSelect) {
        formaPagoSelect.addEventListener('change', function () {
            var div = document.getElementById('preguntasTransferencia');
            if (this.value === 'transferencia') {
                div.style.display = 'block';
            } else {
                div.style.display = 'none';
                // Limpiar campos al ocultar
                document.getElementById('bancoOrigen').value = '';
                document.getElementById('cuentaOrigen').value = '';
                document.getElementById('titularCuentaOrigen').value = '';
            }
        });
    }

    window.confirmarAplicarPago = function () {
        if (pagoActualId === null) {
            alert('Error: No se seleccionó un pago.');
            return;
        }
        var pregunta1 = document.querySelector('input[name="pregunta1"]:checked');
        var montoInput = document.getElementById('montoAplicado');
        var fecha = document.getElementById('fechaAplicacion');
        var formaPago = document.getElementById('formaPago');
        var fechaOperacion = document.getElementById('fechaOperacion');

        if (!pregunta1) {
            alert('Por favor, selecciona si se realizó el pago.');
            return;
        }
        if (!montoInput || !montoInput.value) {
            alert('Por favor, ingresa un monto válido.');
            return;
        }
        var montoValor = parseFloat(montoInput.value.replace(/,/g, ''));
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

        // Validación específica para transferencia
        if (formaPago.value === 'transferencia') {
            var banco = document.getElementById('bancoOrigen').value.trim();
            var cuenta = document.getElementById('cuentaOrigen').value.trim();
            var titular = document.getElementById('titularCuentaOrigen').value.trim();
            if (!banco || !cuenta || !titular) {
                alert('Para Transferencia, debes llenar: Banco de Origen, Cuenta Origen y Nombre del Titular.');
                return;
            }
        }

        var datosPago = {
            id: pagoActualId,
            documento: PAGOS_DATA.find(function (p) { return p.id === pagoActualId; })?.nombre || '',
            pagoRealizado: pregunta1.value,
            monto: montoValor,
            fecha: fecha.value,
            formaPago: formaPago.value,
            comentarios: document.getElementById('comentariosPago')?.value || ''
        };

        var pago = PAGOS_DATA.find(function (p) { return p.id === pagoActualId; });
        if (pago) {
            pago.aplicacion = 'Aplicado: $' + datosPago.monto.toFixed(2) + ' - ' + datosPago.fecha;
            pago.estado = 'aplicado';
            window._actualizandoEstatus = true;
            pago.estatus = 'aplicado';
            window._actualizandoEstatus = false;
        }

        var mensaje = '✅ Pago aplicado exitosamente para:\n\nDocumento: ' + datosPago.documento +
            '\nMonto: $' + datosPago.monto.toFixed(2) +
            '\nFecha: ' + datosPago.fecha +
            '\nForma de pago: ' + datosPago.formaPago +
            '\n¿Pago realizado? ' + (datosPago.pagoRealizado === 'si' ? 'Sí' : datosPago.pagoRealizado === 'no' ? 'No' : 'Parcial');

        if (datosPago.formaPago === 'transferencia') {
            mensaje += '\nBanco Origen: ' + document.getElementById('bancoOrigen').value +
                '\nCuenta Origen: ' + document.getElementById('cuentaOrigen').value +
                '\nTitular: ' + document.getElementById('titularCuentaOrigen').value;
        }
        if (datosPago.comentarios) mensaje += '\nComentarios: ' + datosPago.comentarios;
        alert(mensaje);

        cerrarModalAplicarPago();
        renderAplicacionPagos();
        marcarUltimaModificacion();
    };

    /* ---------------------------------------------------------
       8.3 MODAL CANCELAR PAGO
    --------------------------------------------------------- */
    window.abrirModalCancelarPago = function (id) {
        var pago = PAGOS_DATA.find(function (p) { return p.id === id; });
        if (!pago) return;
        pagoCancelarId = id;
        var modal = document.getElementById('modalCancelarPago');
        var docName = document.getElementById('modalCancelDocName');
        if (docName) {
            docName.innerHTML = 'Documento: <strong>' + pago.nombre + '</strong>';
        }
        var radios = document.querySelectorAll('input[name="cancelPregunta1"]');
        radios.forEach(function (r) { r.checked = false; });
        var motivo = document.getElementById('motivoCancelacion');
        if (motivo) motivo.value = '';
        var fecha = document.getElementById('fechaCancelacion');
        if (fecha) {
            var hoy = new Date().toISOString().split('T')[0];
            fecha.value = hoy;
        }
        var fecha2 = document.getElementById('fechaCancelacion2');
        if (fecha2) {
            var hoy2 = new Date().toISOString().split('T')[0];
            fecha2.value = hoy2;
        }
        var comentarios = document.getElementById('comentariosCancelacion');
        if (comentarios) comentarios.value = '';
        if (modal) modal.style.display = 'flex';
    };

    window.cerrarModalCancelarPago = function () {
        var modal = document.getElementById('modalCancelarPago');
        if (modal) modal.style.display = 'none';
        pagoCancelarId = null;
    };

    window.confirmarCancelarPago = function () {
        if (pagoCancelarId === null) {
            alert('Error: No se seleccionó un pago.');
            return;
        }
        var pregunta1 = document.querySelector('input[name="cancelPregunta1"]:checked');
        var motivo = document.getElementById('motivoCancelacion');
        var fecha = document.getElementById('fechaCancelacion');
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
        var datosCancelacion = {
            id: pagoCancelarId,
            documento: PAGOS_DATA.find(function (p) { return p.id === pagoCancelarId; })?.nombre || '',
            cancelado: pregunta1.value,
            motivo: motivo.value,
            fecha: fecha.value,
            comentarios: document.getElementById('comentariosCancelacion')?.value || ''
        };
        var pago = PAGOS_DATA.find(function (p) { return p.id === pagoCancelarId; });
        if (pago) {
            pago.aplicacion = 'Cancelado: ' + datosCancelacion.motivo + ' - ' + datosCancelacion.fecha;
            pago.estado = 'cancelado';
            window._actualizandoEstatus = true;
            pago.estatus = 'cancelado';
            window._actualizandoEstatus = false;
        }
        var motivosTexto = {
            'pago_duplicado': 'Pago duplicado',
            'error_monto': 'Error en el monto',
            'error_cliente': 'Error en datos del cliente',
            'cancelacion_solicitud': 'Cancelación de la solicitud',
            'rechazo_credito': 'Rechazo del crédito',
            'otros': 'Otros'
        };
        alert('⛔ Pago cancelado exitosamente para:\n\nDocumento: ' + datosCancelacion.documento +
            '\nMotivo: ' + (motivosTexto[datosCancelacion.motivo] || datosCancelacion.motivo) +
            '\nFecha: ' + datosCancelacion.fecha +
            (datosCancelacion.comentarios ? '\nComentarios: ' + datosCancelacion.comentarios : ''));
        cerrarModalCancelarPago();
        renderAplicacionPagos();
        marcarUltimaModificacion();
    };

    document.addEventListener('click', function (event) {
        var modalAplicar = document.getElementById('modalAplicarPago');
        if (modalAplicar && event.target === modalAplicar) {
            cerrarModalAplicarPago();
        }
        var modalCancelar = document.getElementById('modalCancelarPago');
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
        document.querySelectorAll('.stage-btn').forEach(function (b) { b.classList.remove('stage-active'); });
        document.querySelectorAll('.stage-btn').forEach(function (b) {
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
        if (vista === 'Liberaciones por Cargar') {
            window.mostrarLiberaciones();
            return;
        }
        if (vista === 'Solicitud de Liberación') {
            window.mostrarSolicitudLiberacion();
            return;
        }
        // Vista por defecto: Decisiones
        actualizarBotonesSolventacion(true);
        var tabs = document.querySelectorAll('.tab');
        tabs.forEach(function (tab) {
            var tabText = tab.textContent.trim();
            if (tabText === 'Dictamen' || tabText === 'Dictamen Quash' || tabText === 'Acta de Comite') {
                tab.hidden = false;
            }
        });
        window.mostrarDictamen();
        var dictamenHeader = document.querySelector('#dictamen .card-header h2');
        if (dictamenHeader) dictamenHeader.textContent = 'Resolución de Comité de Crédito';
    };

    /* ---------------------------------------------------------
       10. FUNCIÓN PARA MOSTRAR CARGA DE DOCUMENTOS
    --------------------------------------------------------- */
    window.mostrarCargaDocumentos = function () {
        actualizarBotonesSolventacion(false);
        var elementos = ['firmas', 'dictamen', 'dictamenQuash', 'historial', 'tipoActa', 'generarActa',
            'aplicacionPagos', 'registroGarantia', 'valuacion', 'factura',
            'testimonioNotarial', 'actaPosesion', 'reciboSimple', 'constanciaPosesion',
            'solicitudLiberacion', 'liberaciones'
        ];
        elementos.forEach(function (id) {
            var el = document.getElementById(id);
            if (el) el.hidden = true;
        });
        var carga = document.getElementById('cargaDocumentos');
        if (carga) carga.hidden = false;
        document.querySelectorAll('.tab').forEach(function (t) { t.hidden = true; });
        document.querySelectorAll('.tab').forEach(function (t) { t.classList.remove('active'); });
        var tabCarga = document.getElementById('tabCargaDocumentos');
        if (tabCarga) tabCarga.classList.add('active');
        document.querySelectorAll('.stage-btn').forEach(function (b) {
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
        var elementos = ['firmas', 'dictamen', 'dictamenQuash', 'historial', 'tipoActa', 'generarActa',
            'cargaDocumentos', 'registroGarantia', 'valuacion', 'factura',
            'testimonioNotarial', 'actaPosesion', 'reciboSimple', 'constanciaPosesion',
            'solicitudLiberacion', 'liberaciones'
        ];
        elementos.forEach(function (id) {
            var el = document.getElementById(id);
            if (el) el.hidden = true;
        });
        var aplicacion = document.getElementById('aplicacionPagos');
        if (aplicacion) aplicacion.hidden = false;
        document.querySelectorAll('.tab').forEach(function (t) { t.hidden = true; });
        document.querySelectorAll('.tab').forEach(function (t) { t.classList.remove('active'); });
        var tabPagos = document.getElementById('tabAplicacionPagos');
        if (tabPagos) tabPagos.classList.add('active');
        document.querySelectorAll('.stage-btn').forEach(function (b) {
            b.classList.remove('stage-active');
            if (b.textContent.trim() === 'Aplicación de Pagos') {
                b.classList.add('stage-active');
            }
        });
        renderAplicacionPagos();
    };

    /* ---------------------------------------------------------
       12. FUNCIÓN PARA MOSTRAR REGISTRO DE GARANTÍA Y OTROS
    --------------------------------------------------------- */
    window.mostrarRegistroGarantia = function () {
        actualizarBotonesSolventacion(false);
        document.querySelectorAll('.tab').forEach(function (t) { t.hidden = true; });
        document.querySelectorAll('.tab').forEach(function (t) { t.classList.remove('active'); });
        var elementos = ['firmas', 'dictamen', 'dictamenQuash', 'historial', 'tipoActa', 'generarActa',
            'cargaDocumentos', 'aplicacionPagos', 'solicitudLiberacion', 'liberaciones'
        ];
        elementos.forEach(function (id) {
            var el = document.getElementById(id);
            if (el) el.hidden = true;
        });
        var registro = document.getElementById('registroGarantia');
        var valuacion = document.getElementById('valuacion');
        if (registro) registro.hidden = false;
        if (valuacion) valuacion.hidden = false;
        var tipoDocumento = document.getElementById('tipoDocumento');
        var factura = document.getElementById('factura');
        var testimonio = document.getElementById('testimonioNotarial');
        var acta = document.getElementById('actaPosesion');
        var recibo = document.getElementById('reciboSimple');
        var constancia = document.getElementById('constanciaPosesion');
        if (factura && tipoDocumento) factura.hidden = (tipoDocumento.value !== 'FACTURA');
        if (testimonio && tipoDocumento) testimonio.hidden = (tipoDocumento.value !== 'TESTIMONIO NOTARIAL');
        if (acta && tipoDocumento) acta.hidden = (tipoDocumento.value !== 'ACTA DE POSESIÓN');
        if (recibo && tipoDocumento) recibo.hidden = (tipoDocumento.value !== 'RECIBO SIMPLE');
        if (constancia && tipoDocumento) constancia.hidden = (tipoDocumento.value !== 'CONSTANCIA DE POSESIÓN');
        document.querySelectorAll('.stage-btn').forEach(function (b) {
            b.classList.remove('stage-active');
            if (b.textContent.trim() === 'Registro de Garantía y Otros') {
                b.classList.add('stage-active');
            }
        });
    };

    /* ---------------------------------------------------------
       13. LÓGICA PARA REGISTRO DE GARANTÍA Y OTROS
    --------------------------------------------------------- */
    var CLASIFICACIONES = {
        MOBILIARIA: [
            'MAQUINARIA Y EQUIPO', 'VEHÍCULOS TERRESTRES DE MOTOR',
            'PRODUCTOS MANUFACTURADOS DISTINTOS A MAQUINARIA',
            'TITULOS DE DEUDA EMITIDOS POR EL GOBIERNO FEDERAL',
            'TITULOS DE DEUDA EMITIDOS POR ENTIDADES DISTINTAS AL GF',
            'ACCIONES REPRESENTATIVAS DE CAPITAL',
            'DERECHOS, INCLUYENDO DERECHOS DE COBRO',
            'BIENES DE CONSUMO', 'FIDEICOMISO', 'OTROS'
        ],
        INMOBILIARIA: [
            'CASA HABITACION UNIFAMILIAR', 'CONDOMINIO MULTIFAMILIAR',
            'UNIDAD INDUSTRIAL', 'TERRENO EN ZONA RURAL', 'TERRENO EN ZONA URBANA'
        ],
        GUBERNAMENTAL: ['GARANTIA FEGA', 'GARANTIA FONAGA']
    };

    function inicializarRegistroGarantia() {
        var tipoGarantia = document.getElementById('tipoGarantia');
        var clasificacionGarantia = document.getElementById('clasificacionGarantia');
        var tipoDocumento = document.getElementById('tipoDocumento');
        if (!tipoGarantia || !clasificacionGarantia || !tipoDocumento) return;
        if (tipoGarantia.dataset.initialized === 'true') return;
        tipoGarantia.dataset.initialized = 'true';

        function actualizarClasificacion() {
            var tipo = tipoGarantia.value;
            clasificacionGarantia.innerHTML = '';
            clasificacionGarantia.disabled = true;
            if (tipo && CLASIFICACIONES[tipo]) {
                var opciones = CLASIFICACIONES[tipo];
                var optDefault = document.createElement('option');
                optDefault.value = '';
                optDefault.textContent = 'SELECCIONAR';
                clasificacionGarantia.appendChild(optDefault);
                opciones.forEach(function (item) {
                    var opt = document.createElement('option');
                    opt.value = item;
                    opt.textContent = item;
                    clasificacionGarantia.appendChild(opt);
                });
                clasificacionGarantia.disabled = false;
            } else {
                var optDefault2 = document.createElement('option');
                optDefault2.value = '';
                optDefault2.textContent = 'SELECCIONAR';
                clasificacionGarantia.appendChild(optDefault2);
                clasificacionGarantia.disabled = true;
            }
        }
        tipoGarantia.addEventListener('change', actualizarClasificacion);
        actualizarClasificacion();

        function actualizarSeccionDocumento() {
            var tipo = tipoDocumento.value;
            var factura = document.getElementById('factura');
            var testimonio = document.getElementById('testimonioNotarial');
            var acta = document.getElementById('actaPosesion');
            var recibo = document.getElementById('reciboSimple');
            var constancia = document.getElementById('constanciaPosesion');
            if (factura) factura.hidden = (tipo !== 'FACTURA');
            if (testimonio) testimonio.hidden = (tipo !== 'TESTIMONIO NOTARIAL');
            if (acta) acta.hidden = (tipo !== 'ACTA DE POSESIÓN');
            if (recibo) recibo.hidden = (tipo !== 'RECIBO SIMPLE');
            if (constancia) constancia.hidden = (tipo !== 'CONSTANCIA DE POSESIÓN');
        }
        tipoDocumento.addEventListener('change', actualizarSeccionDocumento);
        actualizarSeccionDocumento();
    }
    inicializarRegistroGarantia();

    /* ---------------------------------------------------------
       14. AUTO-COMPLETADO DE OBSERVACIONES EN TIEMPO REAL
    --------------------------------------------------------- */
    var observacionesTextArea = document.getElementById("observaciones");
    var camposObservacionesIds = [
        "tipoDocumento", "descripcionbien", "marca", "modelo", "color",
        "Nserie", "Nmotor", "folio", "nombrede", "expedidopor"
    ];

    function actualizarObservaciones() {
        var partes = [];
        camposObservacionesIds.forEach(function (id) {
            var elemento = document.getElementById(id);
            if (elemento) {
                var valor = elemento.value.trim();
                if (id === "tipoDocumento" && elemento.selectedIndex > 0) {
                    valor = elemento.options[elemento.selectedIndex].text;
                }
                if (valor !== "") {
                    var label = elemento.closest('.field')?.querySelector('label')?.textContent || id;
                    var texto = id === "descripcionbien" ? valor : label + ': ' + valor;
                    partes.push(texto);
                }
            }
        });
        if (observacionesTextArea) {
            var texto = partes.join(", ");
            observacionesTextArea.value = texto ? texto + '.' : '';
        }
    }
    camposObservacionesIds.forEach(function (id) {
        var elemento = document.getElementById(id);
        if (elemento) {
            elemento.addEventListener("input", actualizarObservaciones);
            if (elemento.tagName === "SELECT") {
                elemento.addEventListener("change", actualizarObservaciones);
            }
        }
    });

    /* ============================================================
       NUEVA VISTA: LIBERACIONES POR CARGAR (KIT LEGAL)
       ============================================================ */
    var KIT_DOCUMENTOS = [
        'Contrato', 'Pagare', 'Tabla de amortización', 'Caratula de comite',
        'Presentación', 'Solicitud de crédito'
    ];
    var COMPLEMENTARIOS = [
        'Aclaración firmas por inconsistencias', 'Acta de supervisión de la inversión', 'Reporte fotográfico',
        'Autorización entrega de vehículo y resguardo de llave', 'Carta consentimiento', 'Endoso jurídico (cuando aplique)',
        'Carta aceptación de endoso (cuando aplique)', 'Formato de sustitución garantia', 'Constancia de recepción de garantía', 'Otros'
    ];
    var DOCUMENTOS_ACREDITADO = [
        'Identificacion Oficial', 'CURP', 'RFC', 'Acta de Nacimiento',
        'Comprobante de Domicilio', 'Comprobante de Domicilio Alterno', 'Permiso', 'Arraigo'
    ];
    var DOCUMENTOS_AVAL = [
        'Identificacion Oficial Aval (inhabilitar / mandar a llamar)', 'CURP Aval (inhabilitar / mandar a llamar)',
        'RFC Aval (inhabilitar / mandar a llamar)', 'Acta nacimiento aval (inhabilitar / mandar a llamar)',
        'Comprobante domicilio aval (inhabilitar / mandar a llamar)', 'Arraigo Domiciliar Aval (inhabilitar / mandar a llamar)',
        'Otros Aval'
    ];
    var VIDEO_DESEMBOLSO = ['VIDEO'];
    var DOCUMENTOS_GARANTIA = [
        'Factura', 'Carta Factura',
        'Garantía Adicional 1', 'Garantía Adicional 2', 'Cotización del Seguro (mandar a llamar de carga de documentos)',
        'Póliza del Seguro', 'Comprobante de Pago del Seguro',
        'Pagaré de Distribuidor (cuando aplique)',
        'Evidencia de instalación del GPS', 'Estado de Cuenta (mandar a llamar de carga de documentos)', 'Otros',
    ];

    var kitEstado = {};

    function inicializarKitEstado() {
        var todos = KIT_DOCUMENTOS.concat(COMPLEMENTARIOS, DOCUMENTOS_ACREDITADO, DOCUMENTOS_AVAL, VIDEO_DESEMBOLSO, DOCUMENTOS_GARANTIA);
        todos.forEach(function (nom) {
            if (!kitEstado[nom]) {
                kitEstado[nom] = { archivo: null, validado: false, comentario: '', historial: [] };
            }
        });
    }
    inicializarKitEstado();

    function renderKitTabla(tbodyId, listaDocs) {
        var tbody = document.getElementById(tbodyId);
        if (!tbody) return;
        tbody.innerHTML = '';
        listaDocs.forEach(function (nom) {
            var estado = kitEstado[nom] || { archivo: null, validado: false, comentario: '', historial: [] };
            var tr = document.createElement('tr');
            var fileId = 'kitFile_' + nom.replace(/\s/g, '_');
            tr.innerHTML = '\
                        <td style="text-align: left;"><strong>' + nom + '</strong></td>\
                        <td>\
                            <label class="file-label-kit" for="' + fileId + '">\
                                ' + (estado.archivo ? '✅' : '📎') + ' ' + (estado.archivo || 'Subir') + '\
                                <input type="file" id="' + fileId + '" onchange="subirArchivoKit(\'' + nom + '\', this)">\
                            </label>\
                        </td>\
                        <td>\
                            <button class="btn-icon-kit" onclick="verArchivoKit(\'' + nom + '\')" title="Ver" ' + (estado.archivo ? '' : 'disabled') + '>👁️</button>\
                        </td>\
                        <td>\
                            <label class="switch-validar">\
                                <input type="checkbox" ' + (estado.validado ? 'checked' : '') + ' onchange="toggleValidarKit(\'' + nom + '\', this.checked)">\
                                <span class="slider"></span>\
                            </label>\
                        </td>\
                        <td>\
                            <input type="text" class="comentario-kit" placeholder="Comentario..." value="' + (estado.comentario || '') + '" onchange="guardarComentarioKit(\'' + nom + '\', this.value)">\
                        </td>\
                        <td>\
                            <button class="btn-historico" onclick="verHistoricoKit(\'' + nom + '\')">🔄️</button>\
                        </td>\
                    ';
            tbody.appendChild(tr);
        });
    }

    function renderAllKitTables() {
        renderKitTabla('kitCargaBody', KIT_DOCUMENTOS);
        renderKitTabla('complementariosBody', COMPLEMENTARIOS);
        renderKitTabla('acreditadoBody', DOCUMENTOS_ACREDITADO);
        renderKitTabla('avalBody', DOCUMENTOS_AVAL);
        renderKitTabla('videoBody', VIDEO_DESEMBOLSO);
        renderKitTabla('garantiaBody', DOCUMENTOS_GARANTIA);
    }

    window.subirArchivoKit = function (nombre, input) {
        var file = input.files[0];
        if (file) {
            if (!kitEstado[nombre]) {
                kitEstado[nombre] = { archivo: null, validado: false, comentario: '', historial: [] };
            }
            kitEstado[nombre].archivo = file.name;
            var now = new Date().toLocaleString();
            kitEstado[nombre].historial.push(now + ' - Archivo subido: ' + file.name);
            renderAllKitTables();
        }
    };

    window.verArchivoKit = function (nombre) {
        var estado = kitEstado[nombre];
        if (estado && estado.archivo) {
            alert('Visualizando archivo: ' + estado.archivo + '\n(Simulación)');
        } else {
            alert('No hay archivo subido.');
        }
    };

    window.toggleValidarKit = function (nombre, checked) {
        if (!kitEstado[nombre]) {
            kitEstado[nombre] = { archivo: null, validado: false, comentario: '', historial: [] };
        }
        kitEstado[nombre].validado = checked;
        var now = new Date().toLocaleString();
        kitEstado[nombre].historial.push(now + ' - Documento ' + (checked ? 'validado' : 'desvalidado'));
    };

    window.guardarComentarioKit = function (nombre, valor) {
        if (!kitEstado[nombre]) {
            kitEstado[nombre] = { archivo: null, validado: false, comentario: '', historial: [] };
        }
        kitEstado[nombre].comentario = valor;
        var now = new Date().toLocaleString();
        kitEstado[nombre].historial.push(now + ' - Comentario actualizado: ' + valor);
    };

    window.verHistoricoKit = function (nombre) {
        var estado = kitEstado[nombre];
        if (!estado || estado.historial.length === 0) {
            alert('No hay historial para "' + nombre + '".');
        } else {
            alert('Historial de "' + nombre + '":\n\n' + estado.historial.join('\n'));
        }
    };

    window.mostrarListaKit = function () {
        var lista = document.getElementById('kitListaContainer');
        var carga = document.getElementById('kitCargaContainer');
        if (lista) lista.style.display = 'block';
        if (carga) carga.style.display = 'none';
        var btns = document.querySelectorAll('.liberaciones-izquierda .btn-kit');
        btns.forEach(function (btn) {
            btn.style.background = 'var(--bg-panel-2)';
            btn.style.borderColor = 'var(--border)';
        });
        var btnGen = document.querySelector('.liberaciones-izquierda .btn-kit:first-child');
        if (btnGen) {
            btnGen.style.background = 'var(--bg-card-header)';
            btnGen.style.borderColor = 'var(--accent)';
        }
    };

    window.mostrarCargaKit = function () {
        var lista = document.getElementById('kitListaContainer');
        var carga = document.getElementById('kitCargaContainer');
        if (lista) lista.style.display = 'none';
        if (carga) carga.style.display = 'block';
        var btns = document.querySelectorAll('.liberaciones-izquierda .btn-kit');
        btns.forEach(function (btn) {
            btn.style.background = 'var(--bg-panel-2)';
            btn.style.borderColor = 'var(--border)';
        });
        var btnCarga = document.querySelector('.liberaciones-izquierda .btn-kit:last-child');
        if (btnCarga) {
            btnCarga.style.background = 'var(--bg-card-header)';
            btnCarga.style.borderColor = 'var(--accent)';
        }
        renderAllKitTables();
    };

    window.mostrarLiberaciones = function () {
        document.querySelectorAll('.tab').forEach(function (tab) { tab.hidden = true; });
        document.querySelectorAll('.tab').forEach(function (t) { t.classList.remove('active'); });
        var ids = ['firmas', 'dictamen', 'dictamenQuash', 'historial', 'tipoActa', 'generarActa',
            'cargaDocumentos', 'aplicacionPagos', 'registroGarantia', 'valuacion', 'factura',
            'testimonioNotarial', 'actaPosesion', 'reciboSimple', 'constanciaPosesion',
            'solicitudLiberacion'
        ];
        ids.forEach(function (id) {
            var el = document.getElementById(id);
            if (el) el.hidden = true;
        });
        var liberaciones = document.getElementById('liberaciones');
        if (liberaciones) liberaciones.hidden = false;
        var btnDoc = document.getElementById('btnDocumentosCliente');
        var btnCarat = document.getElementById('btnCaratulaComite');
        if (btnDoc) btnDoc.style.display = 'none';
        if (btnCarat) btnCarat.style.display = 'none';
        document.querySelectorAll('.stage-btn').forEach(function (b) {
            b.classList.remove('stage-active');
            if (b.textContent.trim() === 'Liberaciones por Cargar') {
                b.classList.add('stage-active');
            }
        });
        mostrarListaKit();
    };

    /* ============================================================
       NUEVA VISTA: SOLICITUD DE LIBERACIÓN
       ============================================================ */
    var SOLICITUD_DOCUMENTOS = [
        'Pagare', 'Tabla de amortización', 'Contrato', 'Caratula de comite',
        'Presentación', 'Aclaración firmas por inconsistencias', 'Resguardo de llaves',
        'Acta de supervisión', 'Reporte fotográfico', 'Aceptación de endoso',
        'Fotos del Domicilio', 'Fotos de la Actividad', 'Comprobante de Ingresos',
        'Carta de Excepción a la Norma', 'Autorización de Consulta de Buró',
        'Identificacion Oficial Aval', 'CURP Aval', 'RFC Aval', 'Acta nacimiento aval',
        'Comprobante domicilio aval', 'Arraigo Domiciliar Aval'
    ];

    var solicitudEstado = {};

    function inicializarSolicitud() {
        SOLICITUD_DOCUMENTOS.forEach(function (nom) {
            solicitudEstado[nom] = {
                estado: 'solicitado',
                validado: false,
                observaciones: [],
                foto: null,
                comentario: ''
            };
        });
    }
    inicializarSolicitud();

    function actualizarConteos() {
        var conteos = { solicitado: 0, liberado: 0, observado: 0, porrevisar: 0 };
        SOLICITUD_DOCUMENTOS.forEach(function (nom) {
            var est = solicitudEstado[nom].estado;
            if (conteos[est] !== undefined) conteos[est]++;
        });
        var el1 = document.getElementById('countSolicitado');
        var el2 = document.getElementById('countLiberado');
        var el3 = document.getElementById('countObservado');
        var el4 = document.getElementById('countPorRevisar');
        if (el1) el1.textContent = conteos.solicitado;
        if (el2) el2.textContent = conteos.liberado;
        if (el3) el3.textContent = conteos.observado;
        if (el4) el4.textContent = conteos.porrevisar;
    }

    function renderSolicitud() {
        var tbody = document.getElementById('solicitudBody');
        if (!tbody) return;
        tbody.innerHTML = '';
        SOLICITUD_DOCUMENTOS.forEach(function (nom) {
            var estado = solicitudEstado[nom];
            var tr = document.createElement('tr');
            var fileId = 'solFoto_' + nom.replace(/\s/g, '_');
            var opcionesObs = ['ilegible', 'error firmas', 'no cotejado', 'no valido', 'error en doctor'];
            var obsOptionsHtml = '';
            opcionesObs.forEach(function (obs) {
                var selected = estado.observaciones.includes(obs) ? 'selected' : '';
                obsOptionsHtml += '<option value="' + obs + '" ' + selected + '>' + obs + '</option>';
            });
            tr.innerHTML = '\
                        <td style="text-align: left;"><strong>' + nom + '</strong></td>\
                        <td>\
                            <button class="btn-icon-sol" onclick="verSolicitudDocumento(\'' + nom + '\')" title="Ver documento">👁️</button>\
                        </td>\
                        <td>\
                            <label class="switch-validar">\
                                <input type="checkbox" ' + (estado.validado ? 'checked' : '') + ' onchange="toggleValidarSolicitud(\'' + nom + '\', this.checked)">\
                                <span class="slider"></span>\
                            </label>\
                        </td>\
                        <td>\
                            <select class="select-estado-sol" onchange="cambiarEstadoSolicitud(\'' + nom + '\', this.value)">\
                                <option value="solicitado" ' + (estado.estado === 'solicitado' ? 'selected' : '') + '>Solicitado</option>\
                                <option value="liberado" ' + (estado.estado === 'liberado' ? 'selected' : '') + '>Liberado</option>\
                                <option value="observado" ' + (estado.estado === 'observado' ? 'selected' : '') + '>Observado</option>\
                                <option value="porrevisar" ' + (estado.estado === 'porrevisar' ? 'selected' : '') + '>Por revisar</option>\
                            </select>\
                        </td>\
                        <td>\
                            <select class="select-observaciones" multiple size="1" onchange="cambiarObservacionesSolicitud(\'' + nom + '\', this)">\
                                ' + obsOptionsHtml + '\
                            </select>\
                        </td>\
                        <td>\
                            <label class="file-label-sol" for="' + fileId + '">\
                                ' + (estado.foto ? '✅' : '📎') + ' ' + (estado.foto || 'Subir') + '\
                                <input type="file" id="' + fileId + '" accept="image/*" onchange="subirFotoSolicitud(\'' + nom + '\', this)">\
                            </label>\
                        </td>\
                        <td>\
                            <input type="text" class="comentario-sol" placeholder="Comentario..." value="' + (estado.comentario || '') + '" onchange="guardarComentarioSolicitud(\'' + nom + '\', this.value)">\
                        </td>\
                    ';
            tbody.appendChild(tr);
        });
        actualizarConteos();
    }

    window.toggleValidarSolicitud = function (nombre, checked) {
        solicitudEstado[nombre].validado = checked;
        renderSolicitud();
    };

    window.cambiarEstadoSolicitud = function (nombre, nuevoEstado) {
        solicitudEstado[nombre].estado = nuevoEstado;
        renderSolicitud();
    };

    window.cambiarObservacionesSolicitud = function (nombre, select) {
        var opciones = select.options;
        var seleccionadas = [];
        for (var i = 0; i < opciones.length; i++) {
            if (opciones[i].selected) {
                seleccionadas.push(opciones[i].value);
            }
        }
        solicitudEstado[nombre].observaciones = seleccionadas;
        renderSolicitud();
    };

    window.subirFotoSolicitud = function (nombre, input) {
        var file = input.files[0];
        if (file) {
            solicitudEstado[nombre].foto = file.name;
            renderSolicitud();
        }
    };

    window.guardarComentarioSolicitud = function (nombre, valor) {
        solicitudEstado[nombre].comentario = valor;
    };

    window.verSolicitudDocumento = function (nombre) {
        var doc = solicitudEstado[nombre];
        alert('Visualizando documento: ' + nombre +
            '\nEstado: ' + doc.estado +
            '\nValidado: ' + (doc.validado ? 'Sí' : 'No') +
            '\nObservaciones: ' + (doc.observaciones.join(', ') || 'Ninguna') +
            '\nFoto: ' + (doc.foto || 'Sin foto') +
            '\nComentario: ' + (doc.comentario || 'Sin comentario'));
    };

    window.mostrarSolicitudLiberacion = function () {
        document.querySelectorAll('.tab').forEach(function (tab) { tab.hidden = true; });
        document.querySelectorAll('.tab').forEach(function (t) { t.classList.remove('active'); });
        var ids = ['firmas', 'dictamen', 'dictamenQuash', 'historial', 'tipoActa', 'generarActa',
            'cargaDocumentos', 'aplicacionPagos', 'registroGarantia', 'valuacion', 'factura',
            'testimonioNotarial', 'actaPosesion', 'reciboSimple', 'constanciaPosesion',
            'liberaciones'
        ];
        ids.forEach(function (id) {
            var el = document.getElementById(id);
            if (el) el.hidden = true;
        });
        var solicitud = document.getElementById('solicitudLiberacion');
        if (solicitud) solicitud.hidden = false;
        var btnDoc = document.getElementById('btnDocumentosCliente');
        var btnCarat = document.getElementById('btnCaratulaComite');
        if (btnDoc) btnDoc.style.display = 'none';
        if (btnCarat) btnCarat.style.display = 'none';
        document.querySelectorAll('.stage-btn').forEach(function (b) {
            b.classList.remove('stage-active');
            if (b.textContent.trim() === 'Solicitud de Liberación') {
                b.classList.add('stage-active');
            }
        });
        renderSolicitud();
    };

    window.mostrarDictamen(); // Vista inicial

}); // FIN DEL DOMContentLoaded

// ============================================================
// FUNCIONES GLOBALES PARA LOS BOTONES DE LA VISTA KIT LEGAL
// ============================================================

function generarKitLegal() {
    if (typeof window.mostrarListaKit === 'function') {
        window.mostrarListaKit();
    } else {
        alert('Generar Kit Legal (simulación)');
    }
}

function cargaDocumentosKitLegal() {
    if (typeof window.mostrarCargaKit === 'function') {
        window.mostrarCargaKit();
    } else {
        alert('Carga de Documentos Kit Legal (simulación)');
    }
}

function descargarZipCompleto() {
    alert('Descargando ZIP completo con todos los documentos del Kit Legal y complementarios (simulación)');
}

function verDocumentoKit(nombre) {
    alert('Visualizando documento: "' + nombre + '" (simulación)');
}

function descargarDocumentoKit(nombre) {
    alert('Descargando documento: "' + nombre + '" (simulación)');
}