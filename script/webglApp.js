function resizeCanvasToDisplaySize(canvas) {
	// Lookup the size the browser is displaying the canvas in CSS pixels.
	const displayWidth = canvas.clientWidth;
	const displayHeight = canvas.clientHeight;

	// Check if the canvas is not the same size.
	const needResize = canvas.width !== displayWidth ||
		canvas.height !== displayHeight;

	if (needResize) {
		// Make the canvas the same size
		canvas.width = displayWidth;
		canvas.height = displayHeight;
	}

	return needResize;
}

function createCube(gl, sizeX, sizeY, sizeZ, spacing) {
	var vertices = [], indices = [];
	var sizeIndices = sizeX * sizeY * sizeZ;

	for (var i = 0; i < sizeX; i++) {
		for (var j = 0; j < sizeY; j++) {
			for (var k = 0; k < sizeZ; k++) {
				if (i == 0 || i == sizeX - 1 || j == 0 || j == sizeY - 1 || k == 0 || k == sizeZ - 1) {
					vertices.push(i * spacing);	// X
					vertices.push(j * spacing);	// Y
					vertices.push(k * spacing);	// Z
				}
			}
		}
	}
	for (var i = 0; i < sizeIndices; i++) {
		indices.push(i);
	}

	// VERTEX BUFFER
	var vertexBuffer = gl.createBuffer();
	if (!vertexBuffer) {
		console.log('Failed to create the buffer object');
		return -1;
	}
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

	// INDICES BUFFER
	var indexBuffer = gl.createBuffer();
	if (!vertexBuffer) {
		console.log('Failed to create the buffer object');
		return -1;
	}
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

	return sizeIndices;
}

function main() {

	// Get Canvas
	var canvas = document.getElementById('mySurface');
	// WebGL 2.0 context (GLSL ES 3.00)
	var gl = canvas.getContext('webgl2');

	// Supported?
	if (!gl) {
		console.log('webgl2 not supported');
		gl = canvas.getContext('experimental-webgl');
	}

	// Background color
	gl.clearColor(0.75, 0.75, 0.75, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	gl.enable(gl.DEPTH_TEST);
	gl.enable(gl.CULL_FACE);
	gl.frontFace(gl.CCW);
	gl.cullFace(gl.BACK);

	// Shader Creation
	var vertexShader = gl.createShader(gl.VERTEX_SHADER);
	var framgentShader = gl.createShader(gl.FRAGMENT_SHADER);
	gl.shaderSource(vertexShader, vertexShaderText);
	gl.shaderSource(framgentShader, fragmentShaderText);

	// Compilation && Debug
	gl.compileShader(vertexShader);
	if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
		console.error('ERROR compiling vertex shader!', gl.getShaderInfoLog(vertexShader));
		return;
	}
	gl.compileShader(framgentShader);
	if (!gl.getShaderParameter(framgentShader, gl.COMPILE_STATUS)) {
		console.error('ERROR compiling fragment shader!', gl.getShaderInfoLog(framgentShader));
		return;
	}

	// Graphic Pipeline 
	var program = gl.createProgram();
	gl.attachShader(program, vertexShader);
	gl.attachShader(program, framgentShader);
	gl.linkProgram(program);
	if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
		console.error('ERROR linking program!', gl.getProgramInfoLog(program));
		return;
	}

	// Program Validation
	gl.validateProgram(program);
	if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
		console.error('ERROR validating program!', gl.getProgramInfoLog(program));
		return;
	}

	// SizeX, SizeY, SizeZ, Spacing
	var sizeGrid = createCube(gl, 100, 100, 100, 0.1);

	var positionAttribLocation = gl.getAttribLocation(program, 'vertPosition');

	gl.vertexAttribPointer(
		positionAttribLocation, 							// Attribute Location
		3, 																		// Number of elements (XYZ)
		gl.FLOAT, 														// Type
		gl.FALSE,
		3 * Float32Array.BYTES_PER_ELEMENT, 		// Size of 1 vertex (XYZ)
		0																			// Offset 0
	);

	gl.enableVertexAttribArray(positionAttribLocation);

	// Tell gl what program to use
	gl.useProgram(program);

	// Matrix Creation
	var matWorldUniformLocation = gl.getUniformLocation(program, 'mWorld');
	var matViewUniformLocation = gl.getUniformLocation(program, 'mView');
	var matProjUniformLocation = gl.getUniformLocation(program, 'mProj');
	var floatTimeUniformLocation = gl.getUniformLocation(program, 'time');
	var cubeMatrix = new Float32Array(16);
	var viewMatrix = new Float32Array(16);
	var projMatrix = new Float32Array(16);
	var identityMatrix = new Float32Array(16);

	mat4.identity(identityMatrix);
	mat4.identity(cubeMatrix);

	mat4.lookAt(viewMatrix, [-20, 20, -20], [0, 5, 0], [0, 1, 0]);
	mat4.perspective(projMatrix, glMatrix.glMatrix.toRadian(45), canvas.width / canvas.height, 0.1, 1000.0);

	// Send matrix to GPU
	gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, cubeMatrix);
	gl.uniformMatrix4fv(matViewUniformLocation, gl.FALSE, viewMatrix);
	gl.uniformMatrix4fv(matProjUniformLocation, gl.FALSE, projMatrix);

	// Time
	var duration = 3000;
	var startTime = null;
	var lastTime = 0;

	// Sliders Control
	var floatAmpliUniformLocation = gl.getUniformLocation(program, 'param_amplitude');
	var floatSpeedUniformLocation = gl.getUniformLocation(program, 'param_speed');
	var floatFreqUniformLocation = gl.getUniformLocation(program, 'param_frequency');

	// Main loop render
	function refresh(ms) {
		if (startTime == null) {
			startTime = ms;
		}
		var curentTime = ms - startTime;
		var floatTime = (curentTime / duration) % 1;
		var deltaTime = ms - lastTime;
		lastTime = ms;

		// Clear
		gl.clearColor(0.132, 0.152, 0.199, 1.0);
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

		// Update sliders
		gl.uniform1f(floatAmpliUniformLocation, param_ampli);
		gl.uniform1f(floatSpeedUniformLocation, param_speed);
		gl.uniform1f(floatFreqUniformLocation, param_freq);

		// Update time
		gl.uniform1f(floatTimeUniformLocation, floatTime);

		// Responsive Canvas
		resizeCanvasToDisplaySize(canvas);
		gl.viewport(0, 0, canvas.width, canvas.height);

		// Draw
		gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, cubeMatrix);
		gl.drawElements(gl.POINTS, sizeGrid, gl.UNSIGNED_SHORT, 0);

		requestAnimationFrame(refresh);
	};
	requestAnimationFrame(refresh);
};