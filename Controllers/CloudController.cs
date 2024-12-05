using Amazon.S3;
using Amazon.S3.Model;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebBackendProject.Controllers
{
    [RoutePrefix("cloud")]
    public class CloudController : Controller
    {
        private static readonly string bucketName = "travel-web-an-phan";
        private static readonly string accessKey = "AKIAVVZPCXP3AL34LB5D";
        private static readonly string secretKey = "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";
        private static readonly string region = "us-east-1";
        private static IAmazonS3 s3Client;

        public CloudController()
        {
            s3Client = new AmazonS3Client(accessKey, secretKey, Amazon.RegionEndpoint.GetBySystemName(region));
        }


        [HttpPost]
        [Route("upload/image")] //POST: cloud/upload/image
        public ActionResult UploadImage(string folder)
        {
            try
            {
                // Get the uploaded file from the form data
                var file = Request.Files["image"];

                if (file != null && file.ContentLength > 0)
                {
                    // Validate and sanitize the folder name
                    folder = string.IsNullOrWhiteSpace(folder) ? "default" : folder.Trim().Replace("..", "").Replace("/", "");

                    // Generate a unique name for the image or use the original file name
                    string fileName = Path.GetFileName(file.FileName);

                    // Combine the folder and file name
                    string filePath = $"{folder}/{fileName}";

                    // Upload the file to S3
                    UploadFileToS3(file, filePath);

                    return Json(new { success = true, message = "Image uploaded successfully!", filePath }, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json(new { success = false, message = "Please select a file to upload." }, JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = "Error: " + ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        private void UploadFileToS3(HttpPostedFileBase file, string filePath)
        {
            try
            {
                using (var newMemoryStream = new MemoryStream())
                {
                    file.InputStream.CopyTo(newMemoryStream);

                    var request = new PutObjectRequest
                    {
                        InputStream = newMemoryStream,
                        BucketName = bucketName,
                        Key = filePath,
                        ContentType = file.ContentType
                    };

                    s3Client.PutObject(request);
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Error uploading file to S3", ex);
            }
        }
    }
}