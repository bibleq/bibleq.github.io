var background = document.getElementById('wesley');
var plusimgs = new Object();
var plusid = 1;
var colortheme = '#9CA3AF';

var colors = [];
colors.push(['#F9FAFB', '#F3F4F6', '#E5E7EB', '#D1D5DB', '#9CA3AF', '#6B7280', '#4B5563', '#374151', '#1F2937', '#111827']);
colors.push(['#FDF2F8', '#FCE7F3', '#FBCFE8', '#F9A8D4', '#F472B6', '#EC4899', '#DB2777', '#BE185D', '#9D174D', '#831843']);
colors.push(['#FEF2F2', '#FEE2E2', '#FECACA', '#FCA5A5', '#F87171', '#EF4444', '#DC2626', '#B91C1C', '#991B1B', '#7F1D1D']);
colors.push(['#FFFBEB', '#FEF3C7', '#FDE68A', '#FCD34D', '#FBBF24', '#F59E0B', '#D97706', '#B45309', '#92400E', '#78350F']);
colors.push(['#ECFDF5', '#D1FAE5', '#A7F3D0', '#6EE7B7', '#34D399', '#10B981', '#059669', '#047857', '#065F46', '#064E3B']);
colors.push(['#EFF6FF', '#DBEAFE', '#BFDBFE', '#93C5FD', '#60A5FA', '#3B82F6', '#2563EB', '#1D4ED8', '#1E40AF', '#1E3A8A']);
colors.push(['#EEF2FF', '#E0E7FF', '#C7D2FE', '#A5B4FC', '#818CF8', '#6366F1', '#4F46E5', '#4338CA', '#3730A3', '#312E81']);
colors.push(['#F5F3FF', '#EDE9FE', '#DDD6FE', '#C4B5FD', '#A78BFA', '#8B5CF6', '#7C3AED', '#6D28D9', '#5B21B6', '#4C1D95']);

window.addEventListener('load', function() {

     var colorDiv = this.document.getElementById('colorDiv');
     for (var color of colors) {
          colorDiv.innerHTML += '<div class="flex my-2 justify-end"></div>';
          var lastChild = colorDiv.childNodes[colorDiv.childNodes.length - 1];

          for (var shade of color) {
               lastChild.innerHTML += '<div class="rounded-full w-10 h-10 mx-1" onclick="setColor(this)"></div>'
               var lastItem = lastChild.childNodes[lastChild.childNodes.length - 1];
               lastItem.classList.add("cursor-pointer");
               lastItem.style.backgroundColor = shade;
               lastItem.id = shade;
          }
     }

    document.querySelector('input[type="file"]').addEventListener('change', function() {
        if (this.files && this.files[0]) {

                var images = document.getElementById('image');                
                images.innerHTML += '<li id="plus" name="plus" class="border-4 opacity-50 border-white ml-1 cursor-pointer" onclick="setBackground(this)"><div class="w-48 h-48 bg-gray-300 flex justify-center"><img class="object-contain h-48" src=""></div></li>'

                var element = images.children[images.children.length - 1];
                var img = element.querySelector('img');
                var id = 'plus' + plusid.toString();

                element.id = id;
                plusid++;

                img.onload = () => URL.revokeObjectURL(img.src);
                img.src = URL.createObjectURL(this.files[0]);
                plusimgs[id] = this.files[0];

                setBackground(document.getElementById(id));

                for (var node of document.querySelectorAll('li[name="plus"]')) {
                    node.querySelector('img').src = URL.createObjectURL(plusimgs[node.id]);
                }
                var upload = document.getElementById('upload');
                var newUpload = upload.cloneNode(true);

                upload.remove();
                images.appendChild(newUpload);
        }
    });
    restore();
});

function setColor(element) {
     var r = 0, g = 0, b = 0;
     r += parseInt(element.id.substr(1, 2), 16);
     g += parseInt(element.id.substr(3, 2), 16);
     b += parseInt(element.id.substr(5, 2), 16);
     for (var color of document.getElementById('colorDiv').childNodes) {
          for (var shade of color.childNodes) {
               shade.classList.remove("border-4");
          }
     }
     if (r < 128) {
          element.classList.add("border-4");
          element.style.borderColor = '#F87171';
     } else if (b < 128) {
          element.classList.add("border-4");
          element.style.borderColor = '#818CF8';
     } else if (r + g + b > 350) {
          element.classList.add("border-4");
          element.style.borderColor = '#4B5563';
     } else {
          element.classList.add("border-4");
          element.style.borderColor = '#34D399';
     }
     colortheme = element.style.backgroundColor.substring(4);
     colortheme = colortheme.substr(0, colortheme.length - 1);
     document.getElementById('colorLabel').textContent = element.id;
     document.getElementById('colorFlag').style.backgroundColor = 'rgb(' + colortheme + ')';
     document.getElementById('imgText').style.borderColor = 'rgba(' + colortheme + ', 0.64)';
     document.getElementById('qmark').style.color = 'rgba(' + colortheme + ', 0.64)';
}

function setBackground(element) {
    background = element;
    for (var node of document.getElementById('image').children) {
        node.classList.remove("opacity-75");
        node.classList.remove("border-indigo-400");
        node.classList.add("border-white");
        node.classList.add("opacity-50");
    }
    background.classList.add("opacity-75");
    background.classList.add("border-indigo-400");
    background.classList.remove("border-white");
    background.classList.remove("opacity-50");
    if (element.getAttribute('name') == 'plus') {
        document.getElementById('bgimage').setAttribute('src', URL.createObjectURL(plusimgs[element.id]));
    } else {
        var src = 'img/original/' + background.querySelector('img').getAttribute('src').split('/')[2];
        document.getElementById('bgimage').setAttribute('src', src);
    }
}

function setFont(font) {
    document.getElementById('imgText').style.fontFamily = font;
    document.getElementById('fontLabel').innerHTML = font;
}

function setTheme(element) {
    var theme = element.id;
    for (var node of document.getElementById('theme').children) {
        node.classList.remove("border-indigo-300");
    }
    element.classList.add("border-indigo-300");
    if (theme == 'light') {
        document.getElementById('imgDiv').classList.remove('bg-black');
        document.getElementById('imgDiv').classList.add('bg-black');
        document.getElementById('bgimage').classList.add('opacity-90');
        document.getElementById('bgimage').classList.remove('opacity-80');
        document.getElementById('imgText').style.backgroundColor = "rgba(255, 255, 255, 0.95)";
        document.getElementById('quoteText').classList.add('text-gray-700');
        document.getElementById('quoteText').classList.remove('text-gray-300');
        document.getElementById('quoteAuthor').classList.add('text-gray-600');
        document.getElementById('quoteAuthor').classList.remove('text-gray-400');
    } else {
        document.getElementById('imgDiv').classList.remove('bg-black');
        document.getElementById('imgDiv').classList.add('bg-black');
        document.getElementById('bgimage').classList.add('opacity-90');
        document.getElementById('bgimage').classList.remove('opacity-80');     
        document.getElementById('imgText').style.backgroundColor = "rgba(0, 0, 0, 0.95)";
        document.getElementById('quoteText').classList.remove('text-gray-700');
        document.getElementById('quoteText').classList.add('text-gray-300');
        document.getElementById('quoteAuthor').classList.remove('text-gray-600');
        document.getElementById('quoteAuthor').classList.add('text-gray-400');
    }
}

function setHeader(element) {
    for (var node of document.getElementById('header').children) {
        node.classList.remove("border-indigo-300");
    }
    element.classList.add("border-indigo-300");
    if (element.id == 'empty') {
        document.getElementById('imgHeader').classList.add('hidden');
    } else {
        document.getElementById('imgHeader').classList.remove('hidden');
    }
}

function chooseFile() {
    document.getElementById('imgfile').click();
}

function generate() {
    reset();
    document.getElementById('quoteText').textContent = '„' + document.getElementById('text').value + '”';
    document.getElementById('quoteAuthor').textContent = '(' + document.getElementById('author').value + ')';
    document.getElementById('imgDiv').classList.remove('hidden');
    document.getElementById('imgText').style.fontSize = (1.8 * document.getElementById('fontsize').value / 100).toString() + 'rem';

    html2canvas(document.getElementById('imgDiv')).then(function(arg) {
        reset();
        arg.id = "canvas2";
        document.getElementById('canvasDiv').innerHTML += "<canvas id='canvas' class='object-contain w-full'></canvas>";
        document.getElementById('canvasDiv').appendChild(arg);
        document.getElementById('canvasDiv').classList.remove('hidden');
        document.getElementById('imgDiv').classList.add('hidden');

        var canvas = document.getElementById('canvas');
        var context = canvas.getContext('2d');
        var height = arg.height - 1;
        var width = arg.width - 1;

        canvas.width = width;
        canvas.height = height;
        context.drawImage(arg, 0, 0, width, height, 0, 0, width, height);
        arg.remove();
    });
}

function restore() {
    setBackground(document.getElementById('wesley'));
    setTheme(document.getElementById('light'));
    setColor(document.getElementById('#6B7280'));
    setHeader(document.getElementById('empty'));
    setFont('Crimson Pro');
    document.getElementById('fontsize').value = '100';
    reset();
}

function reset() {
    document.getElementById('canvasDiv').innerHTML = "";
}