// Vertex Shader (es6 template `...`)
var vertexShaderText = `# version 300 es

#define PI 3.1415926538

#define AMPLITUDE 0.05
#define SPEED 3.0
#define FREQ 1.5

precision mediump float;

in vec3 vertPosition;
out vec3 position;
uniform mat4 mWorld;
uniform mat4 mView;
uniform mat4 mProj;
uniform float time;
uniform float param_amplitude;
uniform float param_speed;
uniform float param_frequency;

void main(){
	float t = (time*param_speed) * PI * 2.0;

	float len = length(vertPosition-vec3(5.0));
	t = t+len*param_frequency;

	len *= sin(t)*param_amplitude + 1.0;

	vec3 tmp = normalize(vertPosition-vec3(5.0))*len + vec3(5.0);

	gl_Position = mProj * mView * mWorld * vec4(tmp, 1.0);
	gl_PointSize = 1.0;
	position = vertPosition;
}
`;

// Fragment Shader (es6 template `...`)
var fragmentShaderText = `# version 300 es
precision mediump float;

out vec4 myOutputColor;
in vec3 position;

void main(){
		myOutputColor = vec4(0.0, 0.0, 0.0, 1);
		myOutputColor = vec4((normalize(position)+vec3(1.0))*0.5,1);
}
`;