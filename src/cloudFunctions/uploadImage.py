from google.cloud import storage
from google.cloud import vision
from PIL import Image


def uploadImage(request):

    imageData = request.files['content']
    imageName = request.form['filename']
    img = Image.open(imageData)
    img.save('/tmp/'+imageName)
    storage_client = storage.Client()

    imageBucket = storage_client.get_bucket('bucket-sampleimages1')
    fileContent = imageBucket.blob(imageName)
    fileContent.upload_from_filename('/tmp/'+imageName)

    client = vision.ImageAnnotatorClient()
    image = vision.Image()
    image.source.image_uri = 'gs://bucket-sampleimages1/' + str(imageName)
    response = client.label_detection(image=image)

    list_scores = []
    for label in response.label_annotations:
        list_scores.append((label.description, label.score))

    max_score = 0
    max_obj_name = ''
    for x in list_scores:
        temp = x[0]
        temp_n = x[1]
        if(temp_n > max_score):
            max_score = temp_n
            max_obj_name = temp

    imageBucket = storage_client.get_bucket('bucket-sampleimages1')
    fileContent = imageBucket.blob('sample.txt')
    if fileContent.exists():
        prevData = fileContent.download_as_string().decode("utf-8").split("|")
        if max_obj_name in prevData:
            return {
                'statusCode': 200,
                'body': 'Image Matched'
            }
        else:
            newData = "|".join(prevData) + "|" + max_obj_name
            fileContent.upload_from_string(newData)
            return {
                'statusCode': 401,
                'body': 'Image Not Matched'
            }
    else:
        fileContent = imageBucket.blob('sample.txt')
        fileContent.upload_from_string(max_obj_name + "|")
        return {
            'statusCode': 402,
            'body': 'Image Not Matched'
        }
