"use strict";

////////////////////////////////////////
////////        GLOBALS         ////////
////////////////////////////////////////

let global_isEventActive = false;
let global_duration;
let indicesLength;

const geometrySliders = [
	{ slider: document.getElementById("param_nbpointx"), output: document.getElementById("output_nbpointx"), target: "X" },
	{ slider: document.getElementById("param_nbpointy"), output: document.getElementById("output_nbpointy"), target: "Y" },
	{ slider: document.getElementById("param_nbpointz"), output: document.getElementById("output_nbpointz"), target: "Z" }
];
let vertexNbX = geometrySliders[0].slider.value;
let vertexNbY = geometrySliders[1].slider.value;
let vertexNbZ = geometrySliders[2].slider.value;
geometrySliders[0].output.textContent = vertexNbX;
geometrySliders[1].output.textContent = vertexNbY;
geometrySliders[2].output.textContent = vertexNbZ;

////////////////////////////////////////
////////  SLIDERS MODE  ON/OFF  ////////
////////////////////////////////////////

const elementsNotParams = document.querySelectorAll(".slider-rest");
const elementsIsParams = document.querySelectorAll(".slider-target");
const enterButton = document.getElementById("pulse-button-parameter-enter");
const exitButton = document.getElementById("pulse-button-parameter-exit");
let isActive = false;

function toggleElementsVisibility(elements, opacity, pointerEvents) {
	elements.forEach((element) => {
		element.style.opacity = opacity;
		element.style.pointerEvents = pointerEvents;
	});
}

function enterParams() {
	if (!isActive) {
		toggleElementsVisibility(elementsIsParams, 1.0, "auto");
		toggleElementsVisibility(elementsNotParams, 0.0, "none");
		window.scrollTo(0, 0);
		document.body.style.overflow = "hidden";
		isActive = true;
		global_isEventActive = true;
	}
}

function exitParams() {
	if (isActive) {
		toggleElementsVisibility(elementsIsParams, 0.0, "none");
		toggleElementsVisibility(elementsNotParams, 1.0, "auto");
		document.body.style.overflow = "auto";
		isActive = false;
		global_isEventActive = false;
	}
}

enterButton.addEventListener("click", enterParams);
exitButton.addEventListener("click", exitParams);

////////////////////////////////////////
////////     SLIDERS  SETUP     ////////
////////////////////////////////////////

function setupSliderWithUniformValue(sliderId, outputId, uniformLocation, gl) {
	const slider = document.getElementById(sliderId);
	const output = document.getElementById(outputId);

	function updateUniformAndOutput(value) {
		output.textContent = value;
		gl.uniform1f(uniformLocation, value);
	}

	slider.addEventListener('input', () => {
		updateUniformAndOutput(slider.value);
	});

	updateUniformAndOutput(slider.value);
}

function setupSliderDuration() {
	const slider = document.getElementById("param_duration");
	const output = document.getElementById("output_duration");

	function updateGlobalAndOutput(value) {
		global_duration = value;
		output.textContent = value;
	}

	slider.addEventListener('input', () => {
		updateGlobalAndOutput(slider.value);
	});

	window.addEventListener('load', () => {
		updateGlobalAndOutput(slider.value);
	});
}

setupSliderDuration();

////////////////////////////////////////
////////       RESPONSIVE       ////////
////////////////////////////////////////

function resizeCanvasToDisplaySize(canvas) {
	const displayWidth = canvas.clientWidth;
	const displayHeight = canvas.clientHeight;

	const needResize = canvas.width !== displayWidth || canvas.height !== displayHeight;

	if (needResize) {
		canvas.width = displayWidth;
		canvas.height = displayHeight;
	}

	return needResize;
}

////////////////////////////////////////
////////     VERTEX  SHADER     ////////
////////////////////////////////////////

const VS_CUBE = `#version 300 es
  precision highp float;

  #define PI 3.1415926538

  in vec3 a_position;
  uniform mat4 u_Pmatrix;
  uniform mat4 u_Vmatrix;
  uniform mat4 u_Mmatrix;
  uniform float u_time;
  uniform float u_amplitude;
  uniform float u_frequency;
  uniform float u_pointSize;
  out vec3 v_position;

  void main() 
  {
    float t = u_time * PI * 2.0;
    float len = length(a_position);
    t = t + len * u_frequency;
    len *= sin(t) * u_amplitude + 1.0;
    vec3 newPos = normalize(a_position) * len;

    gl_Position = u_Pmatrix * u_Vmatrix * u_Mmatrix * vec4(newPos, 1.0);
    gl_PointSize = u_pointSize;
    v_position = (normalize(a_position) + vec3(1.0)) * 0.5;
  }
`;

////////////////////////////////////////
////////    FRAGMENT  SHADER    ////////
////////////////////////////////////////

const FS_CUBE = `#version 300 es
  precision mediump float;
  
  in vec3 v_position;
  out vec4 outColor;

  void main()
  {
    outColor = vec4(v_position, 1.0);
  }
`;

////////////////////////////////////////
//////// PROGRAM  &  SHADERLINK ////////
////////////////////////////////////////

function compileShader(gl, type, source) {
	const shader = gl.createShader(type);
	gl.shaderSource(shader, source);
	gl.compileShader(shader);

	if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
		console.error("An error occurred compiling the shader:", gl.getShaderInfoLog(shader));
		gl.deleteShader(shader);
		return null;
	}

	return shader;
}

function linkProgram(gl, vertexShader, fragmentShader) {
	const program = gl.createProgram();
	gl.attachShader(program, vertexShader);
	gl.attachShader(program, fragmentShader);
	gl.linkProgram(program);

	if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
		console.error("Unable to link the program:", gl.getProgramInfoLog(program));
		gl.deleteProgram(program);
		return null;
	}

	gl.validateProgram(program);
	if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
		console.error("The program is invalid:", gl.getProgramInfoLog(program));
		gl.deleteProgram(program);
		return null;
	}

	return program;
}

////////////////////////////////////////
////////  PROJECTION  ROTATION  ////////
////////////////////////////////////////

function getProjection(angle, aspect, zNear, zFar) {
	const projectionMatrix = glMatrix.mat4.create();
	glMatrix.mat4.perspective(projectionMatrix, glMatrix.glMatrix.toRadian(angle), aspect, zNear, zFar);
	return projectionMatrix;
}

////////////////////////////////////////
////////   GEOMETRY  CREATION   ////////
////////////////////////////////////////

function createGeometry(param_sizeX, param_sizeY, param_sizeZ) {
	// Init Array
	const numPoints = param_sizeX * param_sizeY * param_sizeZ - (param_sizeX - 2) * (param_sizeY - 2) * (param_sizeZ - 2);
	const vertices = new Float32Array(numPoints * 3);
	const indices = new Uint16Array(numPoints);

	// Init Spacing [0.0 ; 1.0]
	const intervalX = 1 / (param_sizeX - 1);
	const intervalY = 1 / (param_sizeY - 1);
	const intervalZ = 1 / (param_sizeZ - 1);

	// Offset to center the cube at the origin
	const offsetX = (param_sizeX - 1) / 2;
	const offsetY = (param_sizeY - 1) / 2;
	const offsetZ = (param_sizeZ - 1) / 2;

	// Init Index
	let vertexIndex = 0;
	let index = 0;

	for (let i = 0; i < param_sizeX; i++) {
		for (let j = 0; j < param_sizeY; j++) {
			for (let k = 0; k < param_sizeZ; k++) {
				if (i === 0 || i === param_sizeX - 1 || j === 0 || j === param_sizeY - 1 || k === 0 || k === param_sizeZ - 1) {
					const x = (i - offsetX) * intervalX;
					const y = (j - offsetY) * intervalY;
					const z = (k - offsetZ) * intervalZ;

					vertices[vertexIndex++] = x;
					vertices[vertexIndex++] = y;
					vertices[vertexIndex++] = z;

					indices[index++] = index - 1;
				}
			}
		}
	}
	return { vertices, indices };
}

function updateGeometry(param_sizeX, param_sizeY, param_sizeZ, vertexBuffer, indexBuffer, gl) {
	const { vertices, indices } = createGeometry(param_sizeX, param_sizeY, param_sizeZ);
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.DYNAMIC_DRAW);
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.DYNAMIC_DRAW);
	return indices.length;
}

////////////////////////////////////////
////////          MAIN          ////////
////////////////////////////////////////

function main() {

	////////////////////////////////////////
	////////     WEBGL  CONTEXT     ////////
	////////////////////////////////////////

	const canvas = document.getElementById("myCanvas");
	const gl = canvas.getContext("webgl2");

	if (!gl) {
		console.error("Unable to create WebGL2 context.");
		return;
	}

	// Activer le test de profondeur et le culling des faces arrière
	gl.enable(gl.DEPTH_TEST);
	gl.enable(gl.CULL_FACE);

	////////////////////////////////////////
	////////  VERTEX/INDEX  BUFFER  ////////
	////////////////////////////////////////

	const vertexBuffer = gl.createBuffer();
	const indexBuffer = gl.createBuffer();

	if (!vertexBuffer || !indexBuffer) {
		console.error("Failed to create buffer objects");
		return;
	}

	geometrySliders.forEach(({ slider, output, target }) => {
		slider.addEventListener('input', () => {
			let value = slider.value;
			output.textContent = value;

			if (target === "X") vertexNbX = value;
			else if (target === "Y") vertexNbY = value;
			else if (target === "Z") vertexNbZ = value;

			indicesLength = updateGeometry(vertexNbX, vertexNbY, vertexNbZ, vertexBuffer, indexBuffer, gl);
		});
	});

	// Init
	indicesLength = updateGeometry(vertexNbX, vertexNbY, vertexNbZ, vertexBuffer, indexBuffer, gl);

	////////////////////////////////////////
	////////    PROGRAM CREATION    ////////
	////////////////////////////////////////

	const vertexShader = compileShader(gl, gl.VERTEX_SHADER, VS_CUBE);
	const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, FS_CUBE);
	const program = linkProgram(gl, vertexShader, fragmentShader);

	if (!program) {
		console.error("Failed to create program");
		return;
	}

	const programLocations = {
		position: gl.getAttribLocation(program, "a_position"),
		matrixP: gl.getUniformLocation(program, "u_Pmatrix"),
		matrixV: gl.getUniformLocation(program, "u_Vmatrix"),
		matrixM: gl.getUniformLocation(program, "u_Mmatrix"),
		time: gl.getUniformLocation(program, "u_time"),
		amplitude: gl.getUniformLocation(program, "u_amplitude"),
		speed: gl.getUniformLocation(program, "u_speed"),
		frequency: gl.getUniformLocation(program, "u_frequency"),
		pointSize: gl.getUniformLocation(program, "u_pointSize"),
	};

	gl.useProgram(program);

	////////////////////////////////////////
	////////     ATTRIBUTE LINK     ////////
	////////////////////////////////////////

	// Vertex Link
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
	gl.vertexAttribPointer(programLocations.position, 3, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(programLocations.position);

	////////////////////////////////////////
	////////       MVP MATRIX       ////////
	////////////////////////////////////////

	// Initial modelMatrix 
	const initialModelMatrix = glMatrix.mat4.create();
	glMatrix.mat4.rotate(initialModelMatrix, initialModelMatrix, -Math.PI / 5.1, [-1, 0, 0]);
	glMatrix.mat4.rotate(initialModelMatrix, initialModelMatrix, -Math.PI / 4, [0, 1, 0]);

	// Initial viewMatrix
	const initialViewMatrix = glMatrix.mat4.create();
	glMatrix.mat4.translate(initialViewMatrix, initialViewMatrix, [0, 0, -2.75]);

	// MVP
	const projMatrix = getProjection(40, canvas.width / canvas.height, 1, 100);
	const modelMatrix = glMatrix.mat4.clone(initialModelMatrix);
	const viewMatrix = glMatrix.mat4.clone(initialViewMatrix);

	// Pass uniform
	gl.uniformMatrix4fv(programLocations.matrixP, false, projMatrix);
	gl.uniformMatrix4fv(programLocations.matrixV, false, viewMatrix);
	gl.uniformMatrix4fv(programLocations.matrixM, false, modelMatrix);

	////////////////////////////////////////
	////////          PASS          ////////
	////////////////////////////////////////

	setupSliderWithUniformValue('param_pointsize', 'output_pointsize', programLocations.pointSize, gl);
	setupSliderWithUniformValue('param_amplitude', 'output_amplitude', programLocations.amplitude, gl);
	setupSliderWithUniformValue('param_frequency', 'output_frequency', programLocations.frequency, gl);

	////////////////////////////////////////
	//////////  MOUSE  ROTATION   //////////
	////////////////////////////////////////

	const dampingFactor = 0.925; // Amortissement
	const sensitivity = 0.001; // Sensibilité
	let isDragging = false;
	let lastMouseX = 0;
	let lastMouseY = 0;
	let deltaXRotationAccumulated = 0;
	let deltaYRotationAccumulated = 0;

	canvas.addEventListener("mousedown", (event) => {
		isDragging = true;
		lastMouseX = event.clientX;
		lastMouseY = event.clientY;
	});

	canvas.addEventListener("mouseup", () => {
		isDragging = false;
	});

	canvas.addEventListener("mouseout", () => {
		isDragging = false;
	});

	canvas.addEventListener("mousemove", (event) => {
		if (isDragging && global_isEventActive) {
			const deltaX = event.clientX - lastMouseX;
			const deltaY = event.clientY - lastMouseY;

			// Rotation horizontale autour de l'axe Y
			const deltaYRotation = deltaX * sensitivity;
			deltaXRotationAccumulated += deltaYRotation;

			// Rotation verticale autour de l'axe X (inversée pour des raisons de convivialité)
			const deltaXRotation = deltaY * sensitivity;
			deltaYRotationAccumulated += deltaXRotation;

			lastMouseX = event.clientX;
			lastMouseY = event.clientY;
		}
	});

	////////////////////////////////////////
	////////          DRAW          ////////
	////////////////////////////////////////

	const draw = function (ms) {
		// Responsive canvas on change
		if (resizeCanvasToDisplaySize(canvas)) {
			gl.viewport(0, 0, canvas.width, canvas.height);
		}

		// Update Time
		gl.uniform1f(programLocations.time, (ms / global_duration) % 1);

		// Apply damping to accumulated rotations
		deltaXRotationAccumulated *= dampingFactor;
		deltaYRotationAccumulated *= dampingFactor;

		// Rotation horizontale autour de l'axe Y
		glMatrix.mat4.rotateY(viewMatrix, viewMatrix, deltaXRotationAccumulated);

		// Rotation verticale autour de l'axe X (inversée pour des raisons de convivialité)
		glMatrix.mat4.rotateX(viewMatrix, viewMatrix, deltaYRotationAccumulated);

		// Mettre à jour la matrice de vue utilisée dans le programme WebGL
		gl.uniformMatrix4fv(programLocations.matrixV, false, viewMatrix);

		// Render
		gl.drawElements(gl.POINTS, indicesLength, gl.UNSIGNED_SHORT, 0);
		window.requestAnimationFrame(draw);
	};
	draw(0);
}

////////////////////////////////////////
////////       MAIN  CALL       ////////
////////////////////////////////////////

main();